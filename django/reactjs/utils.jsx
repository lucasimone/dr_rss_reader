/**
 * Created by luca.lamorte on 21/05/2017.
 */
import fetch from "isomorphic-fetch"
import Cookies from "js-cookie";



export function request(url, options, success, error400, error, failure) {
  let headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Accept", "application/json")
  options["headers"] = headers
  return fetch(url, options)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        // for anything in 200-299 we expect our API to return a JSON response
        res.json().then(json => { return success(json) })
      } else if (res.status === 400) {
        // even for 400 we expect a JSON response with form errors
        res.json().then(json => { return error400(json) })
      } else {
        // For all other errors we are not sure if the response is JSON,
        // so we just want to display a generic error modal
        return error(res)
      }
    }).catch((ex) => { return failure(ex) })
}



export function Post(url, feedurl, title, auth, success, error400, error, failure){

        var data = new FormData();
        data.append("title",title);
        data.append("url", feedurl);

        let csrftoken = Cookies.get('csrftoken');
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
          if (this.readyState == 4){
              console.log("STATUS:"+ this.status)
              const response = this.responseText
              if ( this.status >= 200 &&  this.status < 300) {
                    success(this.responseText)
              }else if (this.status === 400) {
                    error400(response)
              }
              else {
                  error(response)
              }
          }
        });
        xhr.open("POST", url);
        xhr.setRequestHeader("authorization", auth);
        xhr.setRequestHeader('X-CSRFToken',  csrftoken);
        try {
            xhr.send(data);
        } catch(err) {
            failure(err);
        }
}