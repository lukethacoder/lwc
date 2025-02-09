/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { TransformOptions } from '../../options';
import { transform, transformSync } from '../transformer';

const TRANSFORMATION_OPTIONS: TransformOptions = {
    namespace: 'x',
    name: 'foo',
};

it('should throw when processing an invalid CSS file', async () => {
    await expect(transform(`<`, 'foo.css', TRANSFORMATION_OPTIONS)).rejects.toMatchObject({
        filename: 'foo.css',
        message: expect.stringContaining('foo.css:1:1: Unknown word'),
    });
});

it('should apply transformation for stylesheet file', async () => {
    const actual = `
        @import 'x/sibling';
        :host {
            color: red;
        }

        div {
            background-color: red;
        }
    `;
    const { code } = await transform(actual, 'foo.css', TRANSFORMATION_OPTIONS);
    expect(code).toContain('function stylesheet');
});

it('should import registerStylesheet and register only the generated stylesheet', () => {
    const actual = `
        @import 'x/sibling';
        :host {
            color: red;
        }

        div {
            background-color: red;
        }
    `;

    const { code } = transformSync(actual, 'foo.css', TRANSFORMATION_OPTIONS);
    expect(code).toContain('import { registerStylesheet }');

    // Verify only the single generated stylesheet is registered (no imported stylesheets)
    expect(code).toContain('registerStylesheet(stylesheet);');
});

describe('custom properties', () => {
    it('should not transform var functions if custom properties a resolved natively', async () => {
        const actual = `div { color: var(--bg-color); }`;
        const { code } = await transform(actual, 'foo.css', {
            ...TRANSFORMATION_OPTIONS,
            stylesheetConfig: {
                customProperties: { resolution: { type: 'native' } },
            },
        });

        expect(code).toContain('var(--bg-color)');
    });

    it('should transform var functions if custom properties a resolved via a module', async () => {
        const actual = `div { color: var(--bg-color); }`;
        const { code } = await transform(actual, 'foo.css', {
            ...TRANSFORMATION_OPTIONS,
            stylesheetConfig: {
                customProperties: {
                    resolution: { type: 'module', name: '@customProperties' },
                },
            },
        });

        expect(code).not.toContain('var(--bg-color)');
        expect(code).toContain('import varResolver from "@customProperties";');
    });
});

describe('regressions', () => {
    it('should escape grave accents', async () => {
        const actual = `/* Comment with grave accents \`#\` */`;
        const { code } = await transform(actual, 'foo.css', TRANSFORMATION_OPTIONS);

        expect(code).not.toContain('/*');
    });

    it('should escape backslash', async () => {
        const actual = `.foo { content: "x\\x"; }`;
        const { code } = await transform(actual, 'foo.css', TRANSFORMATION_OPTIONS);

        expect(code).toContain('\\"x\\\\x\\"');
    });
});
