import { registerStylesheet } from 'lwc';
function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  var suffixToken = token ? ("-" + token) : "";
  return "[aria-labelledby]" + shadowSelector + " {}[aria-labelledby=\"bar\"]" + shadowSelector + " {}";
  /*LWC compiler vX.X.X*/
}
registerStylesheet(stylesheet);
export default [stylesheet];