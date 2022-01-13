/**
 * @file mofron-comp-imgtxt/index.js
 * @brief image text component for mofron
 *        display image next to text
 * @feature image size is synced with text height in +0.05rem offset.
 * @author simpart
 */
const Text = require('mofron-comp-text');
const Image = require('mofron-comp-image');
const SyncHei = require('mofron-effect-synchei');
const VrtPos = require('mofron-effect-vrtpos');
const comutl = mofron.util.common;

module.exports = class extends mofron.class.Component {
    
    /**
     * initialize component
     * 
     * @param (mixed) string: text parameter
     *                object: component options
     * @pmap text
     * @type private
     */
    constructor (p1, p2) {
        try {
            super();
            this.modname('ImageText');
            this.shortForm("image", "text");

	    if (0 < arguments.length) {
                this.config(p1, p2);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
	    super.initDomConts();
            this.style({
                'display': 'flex',
                'align-items' : 'center'
	    });

	    this.child([this.image(), this.text()]);
            
            return;

            /* set dom contents */
            this.adom().child(
                new mofron.Dom({
                    tag: 'div', component: this,
                    style: {
		        'display'     : 'flex',
                        'align-items' : 'center'
	            }
                })
            );
            this.child(this.image());
            let tgt = new mofron.Dom('div', this);
            this.target().child(tgt);
            
            /* default config */
            this.text('');
            this.size('0.25rem');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * image component
     *
     * @param (mofron-comp-image) image component
     * @return (mofron-comp-image) image component
     * @type parameter
     */
    image (prm, cnf) {
        try {
	    if ("string" === typeof prm) {
	        this.image().src(prm);
                return;
            } else if (true === comutl.isinc(prm, "Image")) {
                prm.effect([
                    new SyncHei(this.text(), '0.05rem'),
                    new VrtPos('center')
                ]);
		prm.config(cnf);
            }
            return this.innerComp("image", prm, Image);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * text contents
     * 
     * @param (string) text contents
     * @return (string) text contents
     * @type parameter
     */
    text (prm, cnf) {
        try {
	    if ("string" === typeof prm) {
	        this.text().text(prm);
		this.text().config(cnf);
	        return;
            } else if (true === comutl.isinc(prm, "Text")) {
                prm.style({ "margin-left": "0.05rem" });
		prm.config(cnf);
	    }
            return this.innerComp("text", prm, Text);
//            let buf = this.target();
//            this.target(buf.child()[1]);
//	    this.styleTgt(buf.child()[1]);
//            
//	    this.style({ "margin-left" : this.txtLeft().toString() });
//	    let ret = super.text(prm);
//            
//	    this.target(buf);
//	    this.styleTgt(buf);
//            
//	    return ret;
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
