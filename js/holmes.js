(function(j,k){'object'==typeof exports&&'undefined'!=typeof module?module.exports=k():'function'==typeof define&&define.amd?define(k):j.holmes=k()})(this,function(){'use strict';var k='undefined'==typeof window?global:window,l=function(r,s){return-1!==r.indexOf(s)},m='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&'function'==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?'symbol':typeof r},n=function(r,s){if(!(r instanceof s))throw new TypeError('Cannot call a class as a function')},o=function(){function r(s,t){for(var v,u=0;u<t.length;u++)v=t[u],v.enumerable=v.enumerable||!1,v.configurable=!0,'value'in v&&(v.writable=!0),Object.defineProperty(s,v.key,v)}return function(s,t,u){return t&&r(s.prototype,t),u&&r(s,u),s}}(),p=function(){function r(s){var t=this;n(this,r);var u=!1;if('object'!==('undefined'==typeof s?'undefined':m(s)))throw new Error('The options need to be given inside an object like this:\nnew Holmes({\n\tfind:".result"\n});\nsee also https://haroen.me/holmes/doc/holmes.html');if('string'!=typeof s.find)throw new Error('A find argument is needed. That should be a querySelectorAll for each of the items you want to match individually. You should have something like: \nnew Holmes({\n\tfind:".result"\n});\nsee also https://haroen.me/holmes/doc/holmes.html');var v={input:'input[type=search]',find:'',placeholder:void 0,mark:!1,class:{visible:void 0,hidden:'hidden'},dynamic:!1,minCharacters:0,hiddenAttr:!1,onHidden:void 0,onVisible:void 0,onEmpty:void 0,onFound:void 0,onInput:void 0};this.options=Object.assign({},v,s),this.options.class=Object.assign({},v.class,s.class),this.hidden=0,this.running=!1,window.addEventListener('DOMContentLoaded',function(){t.start()}),this._inputHandler=function(){t.running=!0;var w=!1;t.searchString=t.inputString(),t.options.minCharacters&&0!==t.searchString.length&&t.options.minCharacters>t.searchString.length||(t.options.dynamic&&(t.elements=document.querySelectorAll(t.options.find),t.elementsLength=t.elements.length,t.elementsArray=Array.prototype.slice.call(t.elements)),t.options.mark&&(t._regex=new RegExp('('+t.searchString+')(?![^<]*>)','gi')),t.elementsArray.forEach(function(x){l(x.textContent.toLowerCase(),t.searchString)?(t._showElement(x),u&&'function'==typeof t.options.onFound&&t.options.onFound(t.placeholderNode),w=!0):t._hideElement(x)}),'function'==typeof t.options.onInput&&t.options.onInput(t.searchString),w?t.options.placeholder&&t._hideElement(t.placeholderNode):(t.options.placeholder&&t._showElement(t.placeholderNode),!1==u&&(u=!0,'function'==typeof t.options.onEmpty&&t.options.onEmpty(t.placeholderNode))))}}return o(r,[{key:'_hideElement',value:function(t){this.options.class.visible&&t.classList.remove(this.options.class.visible),t.classList.contains(this.options.class.hidden)||(t.classList.add(this.options.class.hidden),this.hidden++,'function'==typeof this.options.onHidden&&this.options.onHidden(t)),this.options.hiddenAttr&&t.setAttribute('hidden','true'),this.options.mark&&(t.innerHTML=t.innerHTML.replace(/<\/?mark>/g,''))}},{key:'_showElement',value:function(t){this.options.class.visible&&t.classList.add(this.options.class.visible),t.classList.contains(this.options.class.hidden)&&(t.classList.remove(this.options.class.hidden),this.hidden--,'function'==typeof this.options.onVisible&&this.options.onVisible(t)),this.options.hiddenAttr&&t.removeAttribute('hidden'),this.options.mark&&(t.innerHTML=t.innerHTML.replace(/<\/?mark>/g,''),this.searchString.length&&(t.innerHTML=t.innerHTML.replace(this._regex,'<mark>$1</mark>')))}},{key:'inputString',value:function(){if(this.input instanceof HTMLInputElement)return this.input.value.toLowerCase();if(this.input.contentEditable)return this.input.textContent.toLowerCase();throw new Error('The Holmes input was no <input> or contenteditable.')}},{key:'setInput',value:function(t){if(this.input instanceof HTMLInputElement)this.input.value=t;else if(this.input.contentEditable)this.input.textContent=t;else throw new Error('The Holmes input was no <input> or contenteditable.')}},{key:'start',value:function(){var t=this,u=document.querySelector(this.options.input);if(u instanceof HTMLElement)this.input=u;else throw new Error('Your Holmes.input didn\'t match a querySelector');if('string'==typeof this.options.find)this.elements=document.querySelectorAll(this.options.find);else throw new Error('A find argument is needed. That should be a querySelectorAll for each of the items you want to match individually. You should have something like:\nnew Holmes({\n\tfind:".result"\n});\nsee also https://haroen.me/holmes/doc/holmes.html');if(this.elementsLength=this.elements.length,this.elementsArray=Array.prototype.slice.call(this.elements),this.hidden=0,this.options.placeholder)if(this.placeholderNode=document.createElement('div'),this.placeholderNode.id='holmes-placeholder',this._hideElement(this.placeholderNode),this.placeholderNode.innerHTML=this.options.placeholder,this.elements[0].parentNode instanceof Element)this.elements[0].parentNode.appendChild(this.placeholderNode);else throw new Error('The Holmes placeholder could\'t be put; the elements had no parent.');this.options.class.visible&&function(){var v=t.options.class.visible;t.elementsArray.forEach(function(w){w.classList.add(v)})}(),this.input.addEventListener('input',this._inputHandler)}},{key:'stop',value:function(){var t=this;return new Promise(function(u,v){try{if(t.input.removeEventListener('input',t._inputHandler),t.options.placeholder)if(t.placeholderNode.parentNode)t.placeholderNode.parentNode.removeChild(t.placeholderNode);else throw new Error('The Holmes placeholderNode has no parent.');t.options.mark&&t.elementsArray.forEach(function(w){w.innerHTML=w.innerHTML.replace(/<\/?mark>/g,'')}),t.running=!1,u('This instance of Holmes has been stopped.')}catch(w){v(w)}})}},{key:'clear',value:function(){var t=this;this.setInput(''),this.elementsArray.forEach(function(u){t._showElement(u)}),this.options.placeholder&&this._hideElement(this.placeholderNode),this.hidden=0}},{key:'count',value:function(){return{all:this.elementsLength,hidden:this.hidden,visible:this.elementsLength-this.hidden}}}]),r}(),q=function(r){var s=function(){for(var t,u=arguments.length,v=Array(u),w=0;w<u;w++)v[w]=arguments[w];return t='undefined'!=typeof this&&this!==k?r.call.apply(r,[this].concat(v)):new(Function.prototype.bind.apply(r,[null].concat(v))),t};return s.__proto__=r,s.prototype=r.prototype,s}(p);return q});
