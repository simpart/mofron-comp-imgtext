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
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    size (prm,img) {
        try {
            if (undefined === prm) {
                return this.text().size();
	    }
	    this.text().size(prm);
	    if (undefined !== img) {
                this.image().width(img, { lock:true });
		this.image().height(img, { lock:true });
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    mainColor (prm,opt) {
        try {
            return this.text().mainColor(prm,opt);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
