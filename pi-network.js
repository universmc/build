require('dotenv').config();
const express = require('express');
const Web3 = require('web3');
const cors = require('cors');
const bodyParser = require('body-parser');

// Chargement des variables d’environnement
const { PORT, PI_NETWORK_RPC, TVT_CONTRACT, CVNU_CONTRACT, TVA_CONTRACT } = require('./server.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connexion à la blockchain Pi Network
const web3 = new Web3(PI_NETWORK_RPC);

// Chargement des smart contracts
const tvtContract = new web3.eth.Contract(require('./TVT_abi.json'), TVT_CONTRACT);
const cvnuContract = new web3.eth.Contract(require('./CVNU_abi.json'), CVNU_CONTRACT);
const tvaContract = new web3.eth.Contract(require('./TVA_abi.json'), TVA_CONTRACT);

// 🔹 Endpoint pour consulter le solde TVT d'un utilisateur
app.get('/solde/:adresse', async (req, res) => {
    try {
        const balance = await tvtContract.methods.balanceOf(req.params.adresse).call();
        res.json({ solde: balance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Endpoint pour effectuer un paiement en TVT
app.post('/payer', async (req, res) => {
    const { sender, receiver, montant, privateKey } = req.body;
    
    try {
        const tx = {
            from: sender,
            to: receiver,
            value: web3.utils.toWei(montant.toString(), 'ether'),
            gas: 21000
        };
        
        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        res.json({ success: true, transaction: receipt.transactionHash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Endpoint pour ajouter un certificat à CVNU
app.post('/ajouter-certificat', async (req, res) => {
    const { utilisateur, competence, organisme } = req.body;

    try {
        await cvnuContract.methods.ajouterCertificat(competence, organisme).send({ from: utilisateur });
        res.json({ success: true, message: 'Certificat ajouté avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Lancement du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur en écoute sur le port ${PORT}`);
});
