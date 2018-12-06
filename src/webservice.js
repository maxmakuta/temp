export default {
	getData: function(url){
		return new Promise(function(resolve, reject){
			let req = new XMLHttpRequest();
			req.onload = () => {
				resolve(req.response);
			}
			req.onerror = () => {
				reject(req.status);
			}
			req.open("GET", url, true);
			req.responseType = "json";
			req.send();
		})
	}
}