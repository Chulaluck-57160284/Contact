import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  list = [];
  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController, public http: Http) {
     this.loadDB();
  }

  addDB(obj){
    this.http.post("http://angsila.cs.buu.ac.th/~57160284/887330/contact/store.php",obj)
    .subscribe(data =>{
      console.log(data);
      var resp = data.text().trim();
      if(resp = "success"){
        console.log(resp);
        this.loadDB();
      } else {
        console.log("Add error");
      }
      
    }, err=>{
      console.log(err);
    })
  }

  loadDB(){
    this.http.get("http://angsila.cs.buu.ac.th/~57160284/887330/contact/load.php")
    .subscribe(data =>{
      this.list = data.json();
    }, err=>{
      console.log(err);
    })
  }

  addContact(){
    let prompt = this.alertCtrl.create({
      title: "Add Contact",
      message: "Enter a title for your Contact list",
      inputs: [
        {
          name: 'FName',
          placeholder: 'FName'
        },{
          name: 'LName',
          placeholder: 'LName'
        },{
          name: 'MobilePhone',
          placeholder: 'MobilePhone'
        },{
          name: 'Memo',
          placeholder: 'Memo'
        }
      ],
      buttons:[
        {
          text: 'Cancel',
          handler:data=>{
            console.log("cancel clicked");
          }
        },{
          text: 'Add',
          handler:data=>{
            this.list.push(data);
            this.addDB(data);
          }
        }

      ]
    })

    prompt.present();
  }

  goNextPage(Contact){
    this.navCtrl.push(DetailPage,{
      Contact: Contact
    })
  }

  //remove(i){
   remove(id){
   //this.list.splice(i,1);
    this.http.post("http://angsila.cs.buu.ac.th/~57160284/887330/contact/delete.php",{id:id})
    .subscribe(data =>{
      console.log(data);
      var resp = data.text().trim();
      if(resp = "success"){
        console.log(resp);
        this.loadDB();
      } else {
        console.log("Delete Fail");
      }
      
    }, err=>{
      console.log(err);
    })
  }
}
