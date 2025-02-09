import { registerStylesheet } from 'lwc';
import varResolver from "custom-properties-resolver";
function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  var suffixToken = token ? ("-" + token) : "";
  return "div" + shadowSelector + " {color: " + (varResolver("--lwc-color")) + "," + (varResolver("--lwc-other")) + ";}div" + shadowSelector + " {border: " + (varResolver("--border","1px solid rgba(0,0,0,0.1)")) + ";}div" + shadowSelector + " {background: linear-gradient(to top," + (varResolver("--lwc-color")) + "," + (varResolver("--lwc-other")) + ");}";
  /*LWC compiler vX.X.X*/
}
registerStylesheet(stylesheet);
export default [stylesheet];