(function(){
/* jshint unused: false */
/**
 * @typedef module
 * @type {object}
 * @property {string} id - the identifier for the module.
 * @property {string} filename - the fully resolved filename to the module.
 * @property {module} parent - the module that required this one.
 * @property {module[]} children - the module objects required by this one.
 * @property {boolean} loaded - whether or not the module is done loading, or is in the process of loading
 */
/**
	*
	* Define scope for `require`
	*/
var _require = (function(){
	var /**
			* Store modules (types assigned to module.exports)
			* @type {module[]}
			*/
			imports = [],
			/**
			 * Store the code that constructs a module (and assigns to exports)
			 * @type {*[]}
			 */
			factories = [],
			/**
			 * @type {module}
			 */
			module = {},
			/**
			 * Implement CommonJS `require`
			 * http://wiki.commonjs.org/wiki/Modules/1.1.1
			 * @param {string} filename
			 * @returns {*}
			 */
			__require = function( filename ) {

				if ( typeof imports[ filename ] !== "undefined" ) {
					return imports[ filename ].exports;
				}
				module = {
					id: filename,
					filename: filename,
					parent: module,
					children: [],
					exports: {},
					loaded: false
				};
				if ( typeof factories[ filename ] === "undefined" ) {
					throw new Error( "The factory of " + filename + " module not found" );
				}
				// Called first time, so let's run code constructing (exporting) the module
				imports[ filename ] = factories[ filename ]( _require, module.exports, module,
          typeof window !== "undefined" ? window : global );
				imports[ filename ].loaded = true;
				if ( imports[ filename ].parent.children ) {
					imports[ filename ].parent.children.push( imports[ filename ] );
				}
				return imports[ filename ].exports;
			};
	/**
	 * Register module
	 * @param {string} filename
	 * @param {function(module, *)} moduleFactory
	 */
	__require.def = function( filename, moduleFactory ) {
		factories[ filename ] = moduleFactory;
	};
	return __require;
}());
// Must run for UMD, but under CommonJS do not conflict with global require
if ( typeof require === "undefined" ) {
	require = _require;
}
_require.def( "View/Javascript/toto.js", function( _require, exports, module, global ){
/**
 * 
 * toto.js : 
**/

'use strict';

_require( "View/Javascript/KODI_Link.js" );

let NNM = NNM || {};

NNM.toto = (function(self, extentionName) {
  console.log('This Is KODI_Link...');
  return self;
})(NNM.toto || {}, 'toto');

// export default NNM;

  return module;
});

_require.def( "View/Javascript/KODI_Link.js", function( _require, exports, module, global ){
/**
 * 
 * KODI_Link.js : 
**/

'use strict';

let NNM = NNM || {};

NNM.KODI_Link = (function(self, extentionName) {
  console.log('This Is KODI_Link...');
  return self;
})(NNM.KODI_Link || {}, 'KODI_Link');

// export default NNM;


  return module;
});

(function(){
_require( "View/Javascript/toto.js" );
}());
}());
//# sourceMappingURL=./out.js.map