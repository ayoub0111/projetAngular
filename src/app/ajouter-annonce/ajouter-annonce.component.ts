import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Article } from '../model/article';
import { ArticleService } from '../services/article.service';


@Component({
  selector: 'app-ajouter-annonce',
  templateUrl: './ajouter-annonce.component.html',
  styleUrls: ['./ajouter-annonce.component.css']
})
export class AjouterAnnonceComponent implements OnInit,OnChanges {
@Output() eventSaveArticle = new EventEmitter<Article>();
@Input() art:Article;
ar:Article;
listarticle:Article[];
selectedFile=null;
@Input() teste:boolean;
@Output() updateArticle = new EventEmitter<Article>();
alert:boolean=false;
alertAjout:boolean=false;
alertUpdate:boolean=false;




  constructor(private serviceHttp:ArticleService) {
    this.ar=new Article()

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
    console.log(this.art);
    this.serviceHttp.getArtcle().subscribe((data: Article[])=>this.listarticle =data);

  }
  save(){

this.ar.dislike=0;
this.ar.like=0;
this.ar.achat=false;
this.ar.favoris=false;
this.onUpload();

   this.eventSaveArticle.emit(this.ar);
this.alert=true;
this.alertAjout=true;
   console.log(this.ar);

  }

  update(artic:Article){
    artic.like=this.art.like;
    artic.dislike=this.art.dislike;
    artic.achat=this.art.achat;
    artic.favoris=this.art.favoris;
    artic.image=this.art.image;

    this.serviceHttp.updateArticle1(artic.id,artic).subscribe((art)=>artic=art );
    this.updateArticle.emit(artic);
    this.alert=true;
    this.alertUpdate=true;
  }
  onFileSelected(event){
    console.log(event);
    this.selectedFile=<File>event.target.files[0];



  }
  onUpload(){
    console.log("upload");
    this.ar.image=this.selectedFile.name;
    this.serviceHttp.uploadImage(this.selectedFile.name);


  }
  onSubmit(){

    alert('success\n\n' + JSON.stringify(this.ar,null,4));
  }
}
