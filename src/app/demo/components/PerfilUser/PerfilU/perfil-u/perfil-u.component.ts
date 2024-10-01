import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilUService } from '../servicios/perfil-u.service';
import { MessageService } from 'primeng/api';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-perfil-u',
 
  templateUrl: './perfil-u.component.html',
  styleUrl: './perfil-u.component.scss',
  providers: [MessageService]
})
export class PerfilUComponent implements OnInit{
  perfilForm : FormGroup;
  fotoUser: SafeUrl | null = null ;
  actualizarArchivos : any[]=[];

  constructor(
     
    private fb : FormBuilder,
    private perfilService : PerfilUService,
    private mensajeService :  MessageService,
    private sanitizer : DomSanitizer

  ){
    this.perfilForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]]
    });
  
  }

  ngOnInit(){
    this.cargarUserPerfil();
    this.cargarUserFoto();

  }

  

  cargarUserPerfil(){
   this.perfilService.obtenerUserPerfil().subscribe(
    (data) =>{
      this.perfilForm.patchValue({
        name: data.name,
        email: data.email
      });
    },
 
     (error) => {
        this.mensajeService.add({severity:'error', summary: 'Error', detail: 'No se pudo cargar el perfil'});
     }
   );

  }


  cargarUserFoto(){
     this.perfilService.ObtenerFotoUser().subscribe(
      (blob) =>{
        const objectURL = URL.createObjectURL(blob);
        this.fotoUser = this.sanitizer.bypassSecurityTrustUrl(objectURL);

      },
      (error) =>{
        console.error('Error fetching usuario Foto : ',error);

      }
     );
  }


  onSubmit(){

    if(this.perfilForm.valid){
        const formData = new FormData();
        formData.append('name',this.perfilForm.get('name')?.value);
       formData.append('email',this.perfilForm.get('email')?.value);
       if (this.perfilForm.get('password')?.value) {
        formData.append('password', this.perfilForm.get('password')?.value);
      }
      if (this.actualizarArchivos.length > 0) {
        formData.append('photo', this.actualizarArchivos[0]);
      }

      this.perfilService.actualizarUserPerfil(formData).subscribe(
        (response) => {
          this.mensajeService.add({severity:'success', summary: 'Éxito', detail: 'Perfil actualizado correctamente'});
          this.cargarUserFoto();
        },
        (error) => {
          this.mensajeService.add({severity:'error', summary: 'Error', detail: 'No se pudo actualizar el perfil'});
        }
      );

    }
  }


  onUpload(event : any){
    for(let file of event.files){
      this.actualizarArchivos.push(file);
    }
    this.mensajeService.add({severity : 'info', summary: 'Archivo Subido', detail: ''});

  }

}
