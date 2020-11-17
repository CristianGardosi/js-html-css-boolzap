/*****************************************************
******************************************************
******************************************************
         //*******************************\\
        // !BOOLZAP WEB created with VUEJS \\
       //***********************************\\

 ******************************************************
 ******************************************************
 *****************************************************/

var app = new Vue({

    el: '#boolzapp',

    data: {
        // Account personale utente
        user: {
            name: 'Cristian Gardosi',
            avatar: '_io'
        },

        // Elenco contatti
        contacts: [
            {
                name: 'Richi',
                avatar: '_1',
                visible: true,
                lastAccess: '17:21',
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Benjo',
                avatar: '_2',
                visible: true,
                lastAccess: '10:17',
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Artu',
                avatar: '_3',
                visible: true,
                lastAccess: '19:59',
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Moa',
                avatar: '_4',
                visible: true,
                lastAccess: '08:55',
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Il pres',
                avatar: '_5',
                visible: true,
                lastAccess: '12:12',
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ho voglia di giocare a calcio peccato sia chiusa la polisportiva',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Anchio, ma se vuoi possiamo andare a correre',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Peach',
                avatar: '_6',
                visible: true,
                lastAccess: '04:55',
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Come si chiama il ristorante che mi dicevi',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'La rotonda sul Pane di San Giovanni',
                        status: 'received'
                    }
                ],
            }
        ],

        // Variabile utilizzata nei punti in cui mi serve sapere qual'è il contatto attivo tra quelli nella lista contatti di sx (in base al suo index). Dinamicamente in base a quale contatto viene cliccato di volta in volta dall'utente questa variabile cambia e si associa allo specifico click
        indexActiveContact: 0,

        // Variabile dinamica per filtrare attraverso un keyup in tempo reale il contatto che l'utente cerca nella barra di ricerca posta sopra la lista contatti, in base ai caratteri che digita verranno mostrati su schermo solo i/il contatto/i che presentano quei determinati caratteri
        searchContact: '',

        dateLastAccess: '',

        //  Variabile dinamica utilizzata per pushare nuovi messaggi contenenti testo tramite il @keyup di enter aventi le medesime caratteristiche dei messaggi preimpostati e già presenti nell'array
        newMessage: ''
    },

    methods: {
        // Funzione per associare alla variabile indexActiveContact l'index effettivo dei contatti in base alla loro posizione nell'array 
        selectedChat(index) {
            this.indexActiveContact = index;
        },

        // Funzione per filtraggio in tempo reale delle chat sulla base dei caratteri che l'utente inserisce nella search bar posta sopra la lista e dell'inclusione dei suddetti caratteri nei contatti in modo da mostrare in tempo reale solo quelli che li contengono al loro interno. Itero sull'intero array di contatti dopodichè rendo visible solo i contatti nel cui nome è/sono presente/i (.includes) i caratteri che l'utente digita in tempo reale nella searchbar  
        searchChat() {
            this.contacts.forEach( (contact) => {
                contact.visible = contact.name.trim().toLowerCase().includes(this.searchContact.trim().toLowerCase());
            });
        },


        // Funzione per pushare un nuovo messaggio nella chat al @keyup su enter che equivale all'invio. Sto dicendo: "A patto che le condizioni poste vengono rispettate, pusha nel mio array contacts e più precisamente nel 'sotto-array' messages, all'indice corrispondente alla chat selezionata in quel preciso momento i valori di date che grazie a DAYJS sono riportati in tempo reale, il nuovo message che con v-model ho collegato alla mia barra input text e lo stato di sent perchè è inviato da parte dell'utente
        sendMessage() {
            if (this.newMessage.trim() !== '') {
                // Vado a prendere la conversazione attuale in cui pushare effettivamente i nuovi messaggi ed accedo al sotto-array messages in cui iniettare effettivamente i miei nuovi valori
                this.contacts[this.indexActiveContact].messages.push({
                    // Sintassi di DAYJS per la scrittura della data in formato giorno/mese/anno ora/minuti/secondi
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    message: this.newMessage,
                    status: 'sent'
                });
                // Pulisco il mio input text al momento dell'invio
                this.newMessage = '';
                // Al termine di questa funzione faccio 'scattare' il countdown di un secondo che mi separa dalla comparsa su schermo di replyAfer1Sec
                this.replyAfter1Sec();
            }
        },

        // Funzione di autorisposta automatica all'invio di un messaggio da parte dell'utente. Con setTimeout la posiziono un secondo esatto dopo l'invio del suddetto messaggio ed esattamente come ho fatto per sendMessage vado a settarne i valori con un pattern identico
        replyAfter1Sec() {
            setTimeout( () => {
                this.contacts[this.indexActiveContact].messages.push({
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    message: 'Ok di autorisposta dopo 1 secondo',
                    status: 'received'
                });
            }, 1000);
        }
    }

});
