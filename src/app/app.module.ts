import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './Usuarios/usuario/usuario.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChatComponent } from './chat/chat.component';
import { MenuAdminComponent } from './Menus/menu-admin/menu-admin.component';
import { InicioComponent } from './Menus/inicio/inicio.component';
import { LoginComponent } from './Usuarios/login/login.component';
import { RegisterComponent } from './Usuarios/register/register.component';
import { NavbarComponent } from './Menus/navbar/navbar.component';
import { AuthService } from './Services/auth.service';
import { AuthGuard } from './auth.guard';
import { PerfilComponent } from './Usuarios/perfil/perfil.component';
import { TokenInterceptorService } from './Services/token-interceptor.service';
import { AsignaturasAdminComponent } from './Asignaturas/asignaturas-admin/asignaturas-admin.component';
import { NuevaAsignaturaComponent } from './Asignaturas/nueva-asignatura/nueva-asignatura.component';
import { VerAsignaturaComponent } from './Asignaturas/ver-asignatura/ver-asignatura.component';
import { NuevoHorarioComponent } from './Asignaturas/nuevo-horario/nuevo-horario.component';
import { EditarHorarioComponent } from './Asignaturas/editar-horario/editar-horario.component';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NuevaEvaluacionComponent } from './Asignaturas/nueva-evaluacion/nueva-evaluacion.component';
import { AgregarAsignaturaUsuarioComponent } from './Usuarios/agregar-asignatura-usuario/agregar-asignatura-usuario.component';
import { PreguntaComponent } from './preguntas/pregunta/pregunta.component';
import { NuevapreguntaComponent } from './preguntas/nuevapregunta/nuevapregunta.component';
import { FeriadoComponent } from './feriados/feriado/feriado.component';
import { NuevoFeriadoComponent } from './feriados/nuevo-feriado/nuevo-feriado.component';
import { ExcelComponent } from './excels/excel/excel.component';
import { DataTablesModule } from 'angular-datatables';
import { PreviaturasComponent } from './previaturas/previaturas.component';

import { StatisticsComponent } from './statistics/statistics.component';
import { StaticsAsignaturasComponent } from './statics-asignaturas/statics-asignaturas.component';
import { SubjectMaterialComponent } from './subject-material/subject-material.component';
import { ShowSubjectComponent } from './Asignaturas/show-subject/show-subject.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UnansweredQuestionComponent } from './preguntas/unanswered-question/unanswered-question.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    ChatComponent,
    MenuAdminComponent,
    InicioComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    PerfilComponent,
    AsignaturasAdminComponent,
    NuevaAsignaturaComponent,
    VerAsignaturaComponent,
    NuevoHorarioComponent,
    EditarHorarioComponent,
    NuevaEvaluacionComponent,
    AgregarAsignaturaUsuarioComponent,
    PreguntaComponent,
    NuevapreguntaComponent,
    FeriadoComponent,
    NuevoFeriadoComponent,
    ExcelComponent,
    PreviaturasComponent,
    StatisticsComponent,
    StaticsAsignaturasComponent,
    SubjectMaterialComponent,
    ShowSubjectComponent,
    UnansweredQuestionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    DataTablesModule,
    NgbModule
  ],
  providers: [AuthService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]

})

export class AppModule { }
