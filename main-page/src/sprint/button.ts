export class button{
  button:HTMLButtonElement
  constructor(classes:string[],image=""){
const button=document.createElement('button')
classes.forEach(element => {
  button.classList.add(element)
});
button.innerHTML=image;
this.button=button
  }
  appendHere(parent:HTMLElement){
    parent.appendChild(this.button)
  }

}
