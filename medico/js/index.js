function create(){
    document.location = 'create.html';
}

function getBaseURL(){
    return 'https://localhost:44380/api/medicos/';
}

function get(){
    
    getTabelaMedico().innerHTML = '';    
    let codigo = getInputCodigo().value;

    if (codigo === '')
        getAll();
    else
        getById(codigo);
}

function getAll(){
    //console.log('get-ini');
    let endpoint = getBaseURL();
    fetch(endpoint) //assíncrona
        .then(resposta => tratarReposta(resposta))
        .then(medicos => exibirMedicos(medicos))
        .catch(erro => exibirMensagemErro(erro));
    //console.log('get-fim');    
}

function tratarReposta(resposta){
    if (resposta.status === 200)
        return resposta.json();
    else
        throw resposta.status;
}

function getById(codigo){
    let endpoint = `${getBaseURL()}${codigo}`;
    fetch(endpoint) //assíncrona
        .then(resposta => tratarReposta(resposta))
        .then(medico => exibirMedico(medico))
        .catch(erro => exibirMensagemErro(erro));
}

function exibirMedico(medico){    
    getTabelaMedico().innerHTML = montarTrMedico(medico);
}

function exibirMedicos(medicos){
    let trs = "";
    medicos.forEach(medico => {
        trs += montarTrMedico(medico);
    });
    getTabelaMedico().innerHTML = trs;
}

function exibirMensagemErro(erro){
    let mensagemCompleta = '';
    if (erro === 404 || erro === 400)
        mensagemCompleta = "Médico não foi econtrado."
    else    
        mensagemCompleta = 'Ocorreu um erro: ' + erro + '\n Entre em contato com suporte.';
    alert(mensagemCompleta);
}

function montarTrMedico(dados){
    return  `<tr><td>${dados.Codigo}</td><td>${dados.Nome}</td><td>${convertToDatePtBr(dados.DataNascimento)}</td><td>${dados.CRM}</td><td><a href='#' class='pure-menu-link' onclick='editar(${dados.Codigo})'>Editar</a><a class='pure-menu-link' href='javascript:desejaExcluir(${dados.Codigo})'>Excluir</a></td></tr>`
}

function convertToDatePtBr(data){
    if (data != null){
        let dataFormatada = new Date(data.split('T')[0]);
        return dataFormatada.toLocaleDateString('pt-br');
    }        
    return '';
}

function getTabelaMedico(){
    return document.querySelector('#dadosTabelaMedico');
}

function getInputCodigo(){
    return document.querySelector('#codigo');
}

function desejaExcluir(codigo){
    if (confirm("Deseja excluir?"))
        excluir(codigo);
}

function excluir(codigo){
    let endpoint = `${getBaseURL()}${codigo}`;
    fetch(endpoint, {
        method: "DELETE"
    })
        .then(resposta => tratarRepostaExcluir(resposta))
        .catch(erro => exibirMensagemErro(erro));
}

function tratarRepostaExcluir(resposta){
    if (resposta.status === 200){
        alert("Médico excluído com sucesso!");
        get();
    }
    else
        throw resposta.status;
}

function editar(codigo){
    document.location = `edit.html?codigo=${codigo}`;
}