ace.define("ace/ext/modelist",["require","exports","module"],function(e,t,n){"use strict";function i(e){var t=a.text,n=e.split(/[\/\\]/).pop();for(var i=0;i<r.length;i++)if(r[i].supportsFile(n)){t=r[i];break}return t}var r=[],s=function(){function e(e,t,n){this.name=e,this.caption=t,this.mode="ace/mode/"+e,this.extensions=n;var r;/\^/.test(n)?r=n.replace(/\|(\^)?/g,function(e,t){return"$|"+(t?"^":"^.*\\.")})+"$":r="^.*\\.("+n+")$",this.extRe=new RegExp(r,"gi")}return e.prototype.supportsFile=function(e){return e.match(this.extRe)},e}(),o={PUML: ["PUML"]},a={};for(var f in o){var l=o[f],c=(u[f]||f).replace(/_/g," "),h=f.toLowerCase(),p=new s(h,c,l[0]);a[h]=p,r.push(p)}n.exports={getModeForPath:i,modes:r,modesByName:a}});                (function() {
                    ace.require(["ace/ext/modelist"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
