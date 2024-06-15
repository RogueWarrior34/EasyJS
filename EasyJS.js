//EasyJS Part starts here
function $$$(cid){
let element=document.getElementById(cid);
if(!element) throw "Invalid id: "+cid;
return new EasyJSElement(element);
}

$$$.model={
"accordians":[]
}

$$$.accordianHeadingClicked=function(accordianIndex,panelIndex)
{
if($$$.model.accordians[accordianIndex].expandedIndex!=-1)
{
$$$.model.accordians[accordianIndex].panels[$$$.model.accordians[accordianIndex].expandedIndex].style.display='none';
}
if($$$.model.accordians[accordianIndex].expandedIndex!=panelIndex+1)
{
$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.display=$$$.model.accordians[accordianIndex].panels[panelIndex+1].oldDisplay;
$$$.model.accordians[accordianIndex].expandedIndex=panelIndex+1;
}
else{
$$$.model.accordians[accordianIndex].expandedIndex=-1;
}
}

$$$.toAccordian=function(accord)
{
let panels=[];
let expandedIndex=-1;
let children=accord.childNodes;
let x;
for(x=0;x<children.length;x++)
{
if(children[x].nodeName=="H1" || children[x].nodeName=="H2" || children[x].nodeName=="H3" || children[x].nodeName=="H4" || children[x].nodeName=="H5" || children[x].nodeName=="H6") panels[panels.length]=children[x];
if(children[x].nodeName=="DIV") panels[panels.length]=children[x];
}
if(panels.length%2!=0) throw "headings and division malformed";
for(x=0;x<panels.length;x+=2)
{
if(children[x].nodeName=="H1" || children[x].nodeName=="H2" || children[x].nodeName=="H3" || children[x].nodeName=="H4" || children[x].nodeName=="H5" || children[x].nodeName=="H6") throw "headings and division malformed";
if(panels[x+1].nodeName!="DIV") throw "headings and division malformed";
}
function createClickHandler(accordianIndex,panelIndex)
{
return function(){
$$$.accordianHeadingClicked(accordianIndex,panelIndex);
};
}
let accordianIndex=$$$.model.accordians.length;
for(x=0;x<panels.length;x+=2)
{
panels[x].onclick=createClickHandler(accordianIndex,x);
panels[x+1].oldDisplay=panels[x+1].style.display;
panels[x+1].style.display="none";
}
$$$.model.accordians[accordianIndex]={
"panels": panels,
"expandedIndex": -1
};
}



$$$.initFramework=function(){
let allTags=document.getElementsByTagName("*");
let t=null;
let i=0;
let a=null;
for(i=0;i<allTags.length;i++)
{
t=allTags[i];
if(t.hasAttribute("accordian"))
{
a=t.getAttribute("accordian");
if(a=="true")
{
$$$.toAccordian(t);
}
}
}
}

window.addEventListener('load',function(){
$$$.initFramework();
});


function EasyJSElement(element)
{
this.element=element;
this.html=function(content)
{
if(typeof this.element.innerHTML=="string")
{
if((typeof content)=="string")
{
this.element.innerHTML=content;
}
return this.element.innerHTML;
}
return null;
}//html func ends
this.value=function(content)
{
if(typeof this.element.value)
{
if((typeof content)=="string")
{
this.element.value=content;
}
return this.element.value;
}
return null;
}//value func ends

this.fillComboBox=function(jsonObject)
{
if(this.element.nodeName!="SELECT") throw "fillComboBox can be called on a SELECT type object only";

}//combo ends
}//EasyJSElement ends


$$$.ajax=function(jsonObject)
{
if(!jsonObject["url"]) throw "url property is missing in call to ajax";
let url=jsonObject["url"];
if((typeof url)!="string") throw "url property should of string type in call to ajax";
let methodType="GET";
if(jsonObject["methodType"])
{
methodType=jsonObject["methodType"];
if((typeof methodType)!="string") throw "methodType property should be of string type in call to ajax";
methodType=methodType.toUpperCase();
if(["GET","POST"].includes(methodType)==false) throw "methodType should be GET/POST in call to ajax";
}
let onSuccess=null;
if(jsonObject["success"])
{
onSuccess=jsonObject["success"];
if((typeof onSuccess)!="function") throw "success property should be of type function in call to ajax";
}
let onFailure=null;
if(jsonObject["failure"])
{
onFailure=jsonObject["failure"];
if((typeof onFailure)!="function") throw "failure property should be of type function in call to ajax";
}
if(methodType=="GET")
{
var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function(){
if(this.readyState==4)
{
if(this.status==200)
{
var responseData=this.responseText;
if(onSuccess) onSuccess(responseData);
}else
{
if(onFailure) onFailure();
}
}
};
if(jsonObject["data"])
{
let jsonData=jsonObject["data"];
let queryString="";
let qsName;
let qsValue;
let xx=0;
for(k in jsonData)
{
if(xx==0) queryString="?";
if(xx>0) queryString+="&";
xx++;
qsName=encodeURI(k);
qsValue=encodeURI(jsonData[k]);
queryString=queryString+qsName+"="+qsValue;
}
url+=queryString;
}
xmlHttpRequest.open(methodType,url,true);
xmlHttpRequest.send();
}//get ends here
if(methodType=="POST")
{
var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function(){
if(this.readyState==4)
{
if(this.status==200)
{
var responseData=this.responseText;
if(onSuccess) onSuccess(responseData);
}else
{
if(onFailure) onFailure();
}
}
};
let jsonData={};
let  sendJSON=jsonObject["sendJSON"];
if(!sendJSON) sendJSON=false;
if((typeof sendJSON)!="boolean") throw "sendJSON should be of boolean type in call to ajax";
let queryString="";
if(jsonObject["data"])
{
if(sendJSON)
{
jsonData=jsonObject["data"];
}
else
{
queryString="";
let qsName;
let qsValue;
let xx=0;
for(k in jsonData)
{
//if(xx==0) queryString="?";
if(xx>0) queryString+="&";
xx++;
qsName=encodeURI(k);
qsValue=encodeURI(jsonData[k]);
queryString=queryString+qsName+"="+qsValue;
}
}
}
xmlHttpRequest.open(methodType,url,true);
if(sendJSON)
{
xmlHttpRequest.setRequestHeader("Content-Type","application/json");
xmlHttpRequest.send(JSON.stringify(jsonData));
}
else
{
//header
xmlHttpRequest.send(queryString);
}
}//post ends here
}
//EasyJS part ends here
