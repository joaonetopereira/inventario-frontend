import React, { useState, useEffect } from "react";
import Menu from "../../componentes/Menu";
import Head from "../../componentes/Head";
import Usuarios from "../../server/usuario.json";
import './styles.css';
import '../../global.css';
import { FiEdit, FiTrash, FiDelete, FiFilePlus } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert';
import  'react-confirm-alert/src/react-confirm-alert.css' ;
import api from "../../server/api";

export default function Listaempresa(){
    const [lotacao,setLotacao] = useState([]);
    const [empresa,setEmpresa] = useState([]);
    const [patrimonio,setPatrimonio] = useState([]);
    const [setor,setSetor] = useState([]);
    const [usuario,setUsuario] = useState([]);
    const [dados,setDados] = useState([]);
    useEffect(()=>{
        mostrarlista();
    },[])
    function Editar(i){
        window.location.href=`/editarlotacao/${i}`
    }
    function dataFormatada(d){
        var data = new Date(d),
            dia = data.getDate().toString(),
            diaF = (dia.length==1) ? '0' + dia : dia,
            mes = (data.getMonth()+1).toString(),
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
            return diaF+"/"+mesF+"/"+anoF;

    }
    function mostrarlista(){
        api.get('/lotacao')
        .then(res => {
            if(res.status==200){
                setDados(res.data.lotacao);
                console.log("status "+res.status);
                console.log(res.data.usuario); 
        }else{
            console.log("houve um erro na requisição")
        }
           
        });
        console.log(dados)
        // let cadastros = JSON.parse(localStorage.getItem("cd-lotacao") || "[]")
        // setLotacao(cadastros)
        // let ListaUsuarios=JSON.parse(localStorage.getItem("cd-usuarios")||"[]");
        // setUsuario(ListaUsuarios);
        // let listaEmpresa=JSON.parse(localStorage.getItem("cd-empresas")||"[]");
        // setEmpresa(listaEmpresa);
        // let listaSetor=JSON.parse(localStorage.getItem("cd-setor")||"[]");
        // setSetor(listaSetor);
        // let listaPatrimonio=JSON.parse(localStorage.getItem("cd-patrimonio")||"[]");
        // setPatrimonio(listaPatrimonio);
        //console.log("passou aqui")
       // console.log("cd-lotacao")
        
    }
    function excluir(i,nome){
        confirmAlert ( { 
            title : 'Excluir empresa' , 
            message : `Deseja realmente excluir a lotação ${nome}` , 
            buttons : [ 
              { 
                label : 'Sim' , 
                onClick : ( )  => {
                    // let dadosnovos = []
                    // dadosnovos=lotacao.filter(item => item.id!==i)
                    // setDados(dadosnovos)
                    // localStorage.setItem('cd-lotacao',JSON.stringify(dadosnovos))
                    api.delete(`/lotacao/${i}`)
                    .then(res=>{});
                    alert("dados deletados com sucesso");
                    mostrarlista();
                }
              } , 
              { 
                label : 'não' , 
                // onClick :( )  =>  alert ( 'Click No' ) 
              } 
            ] 
          } ) ; 
    }
    
    // function filtrarnome(id,numero){
    //     let dadosnovos=[];
    //     switch(numero){
    //         case 1:
    //             dadosnovos=empresa.filter(value=> value.id==id);
    //         break;
    //         case 2:
    //             dadosnovos=patrimonio.filter(value=> value.id==id);
    //         break;
    //         case 3:
    //             dadosnovos=setor.filter(value=> value.id==id);
    //         break;
    //         case 4:
    //             dadosnovos=usuario.filter(value=> value.id==id);
    //         break;
    //     }
    //     return dadosnovos[0].nome
    //     //console.log(dadosnovos[0].nome)
    // }
    function limpardados(){
        localStorage.removeItem("cd-lotacao")
        alert("Dados deletados")
    }
    return(
        <div className="dashboard-container">
            {/* <p>
                Dashboard
            </p> */}
            <Menu/>
            <div className="principal">
                <Head title="Lista de lotação"/>
                <div className="button_new">
                    <a href="/cadastrodelotacao">
                        <FiFilePlus
                        size={24}
                        color="green"
                        cursor="pointer"
                        />
                    </a>
                </div>
                {/* <p>Lista de usúarios</p> */}
                { dados.length>0 ?
                <table border={1} border-color="black">
                <tr>
                    <th>Id</th>
                    <th>Usuario</th>
                    <th>Patrimonio</th>
                    <th>Setor</th>
                    <th>Empresa</th>
                    <th>Criado Em</th>
                    {/* <th></th> */}
                    {/* <th></th> */}
                </tr>
                    {
                    dados.map((lot)=>{
                    return(
                        // key={lot.codlot}
                        <tr>
                            <td>{lot.codlot}</td>
                            <td>{lot.usuario}</td>
                            <td>{lot.patrimonio}</td>
                            <td>{lot.setor}</td>
                            <td>{lot.empresas}</td>
                            <td>{dataFormatada(lot.createAt)}</td>
                            <td><FiEdit color="blue" size={18} cursor="pointer" onClick={(e)=>Editar(lot.codlot)}/></td>
                            <td><FiDelete color="red" size={18} onClick={(e)=>excluir(lot.codlot,lot.codlot)} cursor="pointer" 
                            /></td>
                            
                        </tr>
                        )
                    })
                    }
                </table>
                :
                <table border={1} border-color="black">
                <tr>
                    <th>Id</th>
                    <th>Usuario</th>
                    <th>Patrimonio</th>
                    <th>Setor</th>
                    <th>Empresa</th>
                    <th>Data movimentação</th>
                    {/* <th></th> */}
                    {/* <th></th> */}
                </tr>
                </table>
                }
                {/* <button onClick={limpardados}>limpar</button> */}
            </div>
                
        </div>

    )
}