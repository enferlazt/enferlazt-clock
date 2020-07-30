;(function() {
	const loadScript = (url, callback) => {
		let partsOfURL = url.match(/[a-z_-]+/gi);
		let scriptID = null;

		if(partsOfURL){
			scriptID = partsOfURL.join('-');
		}else{
			throw new Error(`Incorrect URL: ${url}`);
		}

		const existingScript = document.getElementById(scriptID);

		if (!existingScript) {
			let script = document.createElement('script');
			script.src = url;
			script.id = scriptID;
			document.body.appendChild(script);

			script.onload = () => {
				if (callback) callback();
			};
			
			script.onerror = () => {
				throw new Error(`Connection failed: ${url}`);
			}
		}

		if (existingScript && callback) callback();
	};

	class EnferlaztTime extends HTMLElement {

		constructor(){
			super();
	
			this._url_image = "img/enferlazt-";

			const supportedValues = {
				'analog': [1, 2, 3],
				'digital': [1]
			};
			const TYPE = this.getAttribute('type');
			const VARIATION = this.getAttribute('variation') || 1;
	
			if(!supportedValues[TYPE] || !supportedValues[TYPE].includes(+VARIATION)){
				throw new Error(`Incorrect type "${TYPE}" or variation "${VARIATION}"!`);
			}
	
			switch(TYPE){
				case 'analog':
					this.createType.analog.call(this, VARIATION);
					break;
				case 'digital':
					this.createType.digital.call(this, VARIATION);
					break;
			}
	
			if(this.getAttribute('title') || this.getAttribute('map') == "true"){
				this._getCaption({
					titleText: this.getAttribute('title'),
					fullLocation: this.getAttribute('location'),
				});
			}
		}
	
		get createType(){
			return {
				analog(variation){
					let background = document.createElement('img');
					background.className = 'enferlazt-background';
					background.src = this.getAttribute('bgImg') || `${this._url_image}analog-${variation}.png`;
					this.appendChild(background);
	
					this.createNesting.analog.call(this, {
						classTitle: "hours",
						srcImage: this.getAttribute('hourImg') || `${this._url_image}hour-${variation}.png`
					});
	
					this.createNesting.analog.call(this, {
						classTitle: "minutes",
						srcImage: this.getAttribute('minImg') || `${this._url_image}min-${variation}.png`
					});
	
					this.createNesting.analog.call(this, {
						classTitle: "seconds",
						srcImage: this.getAttribute('secImg') || `${this._url_image}sec-${variation}.png`
					});
	
					this.nextStep.analog.call(this);
					setInterval(this.nextStep.analog.bind(this), 1000);
				},
				digital(variation){
					let background = document.createElement('img');
					background.className = 'enferlazt-background';
					background.src = `${this._url_image}digital-${variation}.png`;
					this.appendChild(background);
	
					let div = document.createElement('div');
					div.className = 'enferlazt-digital';
					this.appendChild(div);
	
					this.createNesting.digital.call(div, {
						classTitle: "hours"
					});
	
					this.createNesting.digital.call(div, {
						classTitle: "delimiter"
					});
					div.children[1].innerHTML = ':';
	
					this.createNesting.digital.call(div, {
						classTitle: "minutes"
					});
					
					this.createNesting.digital.call(div, {
						classTitle: "seconds"
					});
	
					this.nextStep.digital.call(this, div);
					setInterval(this.nextStep.digital.bind(this, div), 1000);
				},
			};
		}
	
		get createNesting(){
			return {
				analog({classTitle, srcImage}){
					let div = document.createElement('div');
					div.className = `enferlazt-${classTitle}`;
					this.appendChild(div);
	
					let img = document.createElement('img');
					img.className = `enferlazt-${classTitle}-img`;
					img.src = srcImage;
					div.appendChild(img);
				},
				digital({classTitle}){
					let div = document.createElement('span');
					div.className = `enferlazt-${classTitle}`;
					this.appendChild(div);
				}
			}
		}
	
		get nextStep(){
			return {
				analog(){
					let d = moment().tz(this.getAttribute('location'));
					let sec = 6 * d.format('ss');
					let min = 6 * (+d.format('mm') + (1/60) * d.format('ss'));
					let hour = 30 * (+d.format('HH') + (1/60) * d.format('mm'));
	
					let copy = this.children[3].children[0];
					this.children[3].replaceChild(copy, this.children[3].children[0]);
					
					this.children[1].style.webkitTransform = `rotateZ(${hour}deg)`;
					this.children[2].style.webkitTransform = `rotateZ(${min}deg)`;
					this.children[3].style.webkitTransform = `rotateZ(${sec}deg)`;
					
					this.children[1].style.transform = `rotateZ(${hour}deg)`;
					this.children[2].style.transform = `rotateZ(${min}deg)`;
					this.children[3].style.transform = `rotateZ(${sec}deg)`;
				},
				digital(div){
					let d = moment().tz(this.getAttribute('location'));
					div.children[0].innerHTML = d.format('HH');
					div.children[2].innerHTML = d.format('mm');
					div.children[3].innerHTML = d.format('ss');
				}
			}
		}
	
		_getCaption({titleText, fullLocation}){
			let captionText = titleText || city();
			let p = document.createElement('p');
			p.className ='enferlazt-caption';
			p.innerHTML = captionText;
			this.appendChild(p);
	
			if(this.getAttribute('map') == "true"){
				this._getMap(p, fullLocation);
			}
	
			function city(){
				let result = fullLocation.match(/[^/][a-z_]+$/gi);
				result = result[0].replace(/_/g, ' ');
				return result = result[0].toUpperCase() + result.substring(1);
			}
		}
	
		_getMap(p, fullLocation){
			let iframe = document.createElement('iframe');
			iframe.className = 'enferlazt-iframe';
			iframe.frameBorder = '';
			iframe.src = "https://maps.google.com/maps?&width=170&amp;&height=170&amp;&hl=en&amp;&q=" + fullLocation + "&amp;&ie=UTF8&amp;&t=&amp;&z=3&amp;&iwloc=B&amp;&output=embed";
			this.appendChild(iframe);
			
			p.addEventListener('click', () => iframe.style.display = getComputedStyle(iframe).display == 'none' ? 'block' : 'none');
		}
	
		static get observedAttributes() {
			return ['location', 'type', 'variation', 'map', 'title', 'bgImage', 'hourImg', 'minImg', 'secImg'];
		}
		
	}

	loadScript('http://momentjs.com/downloads/moment.js', () => {
		loadScript('http://momentjs.com/downloads/moment-timezone-with-data.js', () => {
			customElements.define('enferlazt-clock', EnferlaztTime);
		})
	});
})();