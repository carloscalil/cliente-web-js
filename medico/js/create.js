function back(){
    document.location = 'index.html';
}

function post(){
    let endpoint = 'https://localhost:44380/api/medicos';
    
    fetch (endpoint, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(getMedico())
    })
        .then(resposta => tratarReposta(resposta))        
        .catch(erro => exibirMensagemErro(erro));
}

function tratarReposta(resposta){    
    if (resposta.status === 200){
        exibirMensagemSucesso();
        back();
    }else{       
        throw resposta.status;
    }
}

function exibirMensagemSucesso(){
    alert('Médico cadastrado com sucesso');
}

function exibirMensagemErro(erro){
    let mensagemCompleta = '';
    if (erro === 404 || erro === 400)
        mensagemCompleta = "Preencha os campos obrigatórios.";
        
    else    
        mensagemCompleta = 'Ocorreu um erro: ' + erro + '\n Entre em contato com suporte.';
    alert(mensagemCompleta);
}

function getMedico(){
    return {
        Nome: getInputNome().value,
        DataNascimento: getInputDataNascimento().value,
        CRM: getInputCRM().value 
    };
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