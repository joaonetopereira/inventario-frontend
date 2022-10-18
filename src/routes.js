import React from "react";

import Logom from "./pages/Logom";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Listausuarios from './pages/Listausuarios';
import CadastrodeUsuario from "./pages/cadastrdeusuario";
import EditarUsuario from "./pages/Editarusuario";
import CadastrodeEmpresa from "./pages/cadastrdeempresa";
import Listaempresa from "./pages/Listaempresas";
import Editarempresa from "./pages/Editarempresa";
import Listapatrimonio from "./pages/Listapatrimonio";
import Cadastrodepatrimonio from "./pages/cadastrodepatrimonio" 
import Editarpatrimonio from "./pages/Editarpatrimonio";
import Listasetor from "./pages/Listasetor";
import Editarsetor from "./pages/Editarsetor";
import Cadastrodesetor from "./pages/cadastrodesetor";
import Listalotação from "./pages/Listalotação";
import Cadastrodelotação from "./pages/cadastrodelotação";
import Editarlotacao from "./pages/Editarlotacao";
export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path={"/"} exact component={Logom}/>
                <Route path={"/dashboard"} component={Dashboard}/>
                <Route path={"/listausuarios"} component={Listausuarios}/>
                <Route path={"/cadastrodeusuario"} component={CadastrodeUsuario}/>
                <Route path={"/editarusuario/:id"} component={EditarUsuario}/>
                <Route path={"/cadastrodeempresa"} component={CadastrodeEmpresa}/>
                <Route path={"/listaempresa"} component={Listaempresa}/>
                <Route path={"/editarempresa/:id"} component={Editarempresa}/>
                <Route path={"/listapatrimonio"} component={Listapatrimonio}/>
                <Route path={"/cadastrodepatrimonio"} component={Cadastrodepatrimonio}/>
                <Route path={"/editarpatrimonio/:id"} component={Editarpatrimonio}/>
                <Route path={"/listasetor"} component={Listasetor}/>
                <Route path={"/cadastrodesetor"} component={Cadastrodesetor}/>
                <Route path={"/editarsetor/:id"} component={Editarsetor}/>
                <Route path={"/listalotacao"} component={Listalotação}/>
                <Route path={"/cadastrodelotacao"} component={Cadastrodelotação}/>
                <Route path={"/editarlotacao/:id"} component={Editarlotacao}/>
            </Switch>
        </BrowserRouter>
    )
}