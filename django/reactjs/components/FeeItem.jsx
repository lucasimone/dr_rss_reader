import React from "react";


function formatDate(date) {
  var mydate = new Date(date);
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = mydate.getDate();
  var monthIndex = mydate.getMonth();
  var year = mydate.getFullYear();
  var hh  = mydate.getHours();
  var mm  = mydate.getMinutes();
  if (mm<10) mm = "0"+mm;

  return day + ' ' + monthNames[monthIndex] + ' ' + year + ' - '+hh + ':' +mm;
}


export const FeedItem = (props) => {


    let item = props.item
    let index = item.content.search("<div")
    let content = item.content.substring(0, index);
    let pubDate = "   " + formatDate(item.pub_date)
    let icon_read  = "glyphicon glyphicon-eye-close"
    if (item.read) icon_read = "glyphicon glyphicon-eye-open";
    let tags = []
    if (item.tags) {
        item.tags.split(" ").forEach((item, index) => {
            item = " " + item +" "
            let unique_id = item + "_" + index
            let node =(
                <div className="pull-left">
                    <span key={unique_id}  className="label label-primary"> # {item} </span> &nbsp; </div>
        )
        tags.push(node)
        })

    }
    let def = "default_" + item.id
    tags.push(<div key={def} className="pull-left"><a href="#">
        <span   className="label label-warning"> New #TAG </span></a> &nbsp;
    </div>)


    return (
            <div className="col-4 col-lg-12" id={item.id}>
                <div className="jumbotron">
                  <h3>{item.title}</h3>
                  <p>{content}</p>


                  <p>
                      <a className="btn btn-primary pull-right" href={item.link} role="button">Read more &raquo;</a>

                      <a className="btn btn-default">
                          <span className={icon_read} aria-hidden="true"/>
                      </a>
                      <a onClick={() => (alert("TBD"))}><span className="label label-default" ></span></a>{pubDate}

                  </p>
                    <div className="row"> {tags} </div>

                </div>
            </div>

    );
};


