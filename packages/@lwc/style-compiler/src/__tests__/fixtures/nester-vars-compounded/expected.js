import { registerStylesheet } from 'lwc';
import varResolver from "custom-properties-resolver";
function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  var suffixToken = token ? ("-" + token) : "";
  return ".a" + shadowSelector + " {box-shadow: " + (varResolver("--lwc-c-active-button-box-shadow","0 0 2px " + varResolver("--lwc-brand-accessible","#0070d2"))) + ";}";
  /*LWC compiler vX.X.X*/
}
registerStylesheet(stylesheet);
export default [stylesheet];