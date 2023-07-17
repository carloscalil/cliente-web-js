window.onload = function(){
    let parametros = new URLSearchParams(window.location.search);
    let codigo = parametros.get("codigo");   
    getById(codigo);
}

function back(){
    document.location = 'index.html';
}

function desejaAlterar(){
    if (confirm('Deseja alterar?'))
        put();
}

function put(){    
    let endpoint = `${getBaseURL()}${getLabelCodigo().textContent}`;  
    fetch (endpoint, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(getMedico())
    })
        .then(resposta => tratarReposta(resposta)) 
        .then(medico => tratarRespostaPut(medico))
        .catch(erro => exibirMensagemErro(erro));
}

function tratarRespostaPut(medico){
    alert(`Médico ${medico.Nome} alterado com sucesso!`);
    back();
}

function getMedico(){
    return {
        Codigo: getLabelCodigo().textContent,
        Nome: getInputNome().value,
        DataNascimento: getInputDataNascimento().value,
        CRM: getInputCRM().value 
    };
}

function getBaseURL(){
    return 'https://localhost:44380/api/medicos/';
}

function getById(codigo){
    let endpoint = `${getBaseURL()}${codigo}`;
    fetch(endpoint) //assíncrona
        .then(resposta => tratarReposta(resposta))
        .then(medico => exibirMedico(medico))
        .catch(erro => exibirMensagemErro(erro));
}

function tratarReposta(resposta){
    if (resposta.status === 200)
        return resposta.json();
    else
        throw resposta.status;
}

function exibirMedico(medico){    
    getInputNome().value = medico.Nome;
    getInputCRM().value = medico.CRM;
    if (medico.DataNascimento != null)
        getInputDataNascimento().value = medico.DataNascimento.split('T')[0];
    getLabelCodigo().innerHTML = medico.Codigo;
}

function exibirMensagemErro(erro){
    let mensagemCompleta = '';
    if (erro === 400)
        mensagemCompleta = "Preencha os campos obrigatórios.";
    else if (erro === 404){
        mensagemCompleta = "Médico não foi econtrado.";
        back();
    }
    else    
        mensagemCompleta = 'Ocorreu um erro: ' + erro + '\n Entre em contato com suporte.';
    alert(mensagemCompleta);
}

function getInputNome(){
    return document.querySelector('#nome');
}

function getInputCRM(){
    return document.querySelector('#crm');
}

function getInputDataNascimento(){
    return document.querySelector('#dataNascimento');
}

function getLabelCodigo(){
    return document.querySelector('#codigo');
}

