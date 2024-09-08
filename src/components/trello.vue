<template>
    <div>
      <h1>Trello Board</h1>
      <div v-for="list in lists" :key="list.id" class="list">
        <h2>{{ list.name }}</h2>
        <draggable
          v-model="list.cards"
          @end="onDragEnd"
          :item-key="'id'"
          :group="{ name: 'cards', pull: 'clone', put: true }"
        >
          <template #item="{ element }">
            <div :key="element.id" class="card">
              <p>{{ element.name }}</p>
              <button @click="editCard(element)">Edit</button>
              <button @click="removeCard(element)">Delete</button>
            </div>
          </template>
        </draggable>
        <button @click="addCard(list.id)">Add Card</button>
      </div>
    </div>
  </template>
  
  <script>
  import draggable from "vuedraggable";
  
  export default {
    components: { draggable },
    data() {
      return {
        lists: [],
        trelloApiKey: import.meta.env.VITE_TRELLO_API_KEY,
        trelloApiSecret: import.meta.env.VITE_TRELLO_API_SECRET,
      };
    },
    mounted() {
      this.fetchTrelloBoardData();
    },
    methods: {
      async fetchTrelloBoardData() {
        const apiKey = this.trelloApiKey;
        const token = this.trelloApiSecret;
        const boardId = "2guLf5Br";
        const url = `https://api.trello.com/1/boards/${boardId}?lists=all&cards=all&key=${apiKey}&token=${token}`;
  
        try {
          const response = await fetch(url);
          const data = await response.json();
          this.lists = data.lists.map((list) => ({
            id: list.id,
            name: list.name,
            cards: data.cards.filter((card) => card.idList === list.id),
          }));
        } catch (error) {
          console.error("Error fetching Trello board data:", error);
        }
      },
      async onDragEnd(event) {
        const movedCard = event.item.__vue__.card;
        const newListId = event.to.__vue__.list.id; // get the new list id
        const oldListId = event.from.__vue__.list.id; // get the old list id
  
        // Actualiza el estado local y Trello
        await this.updateCardList(movedCard.id, newListId);
        this.removeCardFromList(oldListId, movedCard);
      },
      async removeCardFromList(listId, card) {
        const list = this.lists.find((list) => list.id === listId);
        if (list) {
          list.cards = list.cards.filter((c) => c.id !== card.id);
        }
      },
      editCard(card) {
        const newName = prompt("Edit card name:", card.name);
        if (newName) {
          card.name = newName;
          this.updateCard(card.id, newName);
        }
      },
      addCard(listId) {
        const cardName = prompt("Enter card name:");
        if (cardName) {
          this.createCard(listId, cardName);
        }
      },
      async removeCard(card) {
        const confirmed = confirm(
          `Are you sure you want to delete the card "${card.name}"?`
        );
        if (confirmed) {
          const apiKey = this.trelloApiKey;
          const token = this.trelloApiSecret;
          const url = `https://api.trello.com/1/cards/${card.id}?key=${apiKey}&token=${token}`;
  
          try {
            await fetch(url, { method: "DELETE" });
            this.lists.forEach((list) => {
              list.cards = list.cards.filter((c) => c.id !== card.id);
            });
          } catch (error) {
            console.error("Error deleting card:", error);
          }
        }
      },
      async updateCardList(cardId, newListId) {
        const apiKey = this.trelloApiKey;
        const token = this.trelloApiSecret;
        const url = `https://api.trello.com/1/cards/${cardId}?idList=${newListId}&key=${apiKey}&token=${token}`;
  
        try {
          const response = await fetch(url, { method: "PUT" });
          const data = await response.json();
          console.log("Card moved to new list:", data);
        } catch (error) {
          console.error("Error moving card to new list:", error);
        }
      },
      async updateCard(cardId, newName) {
        const apiKey = this.trelloApiKey;
        const token = this.trelloApiSecret;
        const url = `https://api.trello.com/1/cards/${cardId}?name=${encodeURIComponent(
          newName
        )}&key=${apiKey}&token=${token}`;
  
        try {
          const response = await fetch(url, { method: "PUT" });
          const data = await response.json();
          console.log("Card updated:", data);
        } catch (error) {
          console.error("Error updating card:", error);
        }
      },
      async createCard(listId, cardName) {
        const apiKey = this.trelloApiKey;
        const token = this.trelloApiSecret;
        const url = `https://api.trello.com/1/cards?name=${encodeURIComponent(
          cardName
        )}&idList=${listId}&key=${apiKey}&token=${token}`;
  
        try {
          const response = await fetch(url, { method: "POST" });
          const data = await response.json();
          console.log("Card created:", data);
          this.fetchTrelloBoardData(); // Recarga los datos del tablero
        } catch (error) {
          console.error("Error creating card:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: rgb(0, 83, 123);
    background: radial-gradient(circle, rgba(0, 83, 123, 1) 0%, rgba(0, 33, 86, 1) 35%);
  }
  
  .window {
    display: flex;
    flex-direction: column;
    width: 90vw;
    max-width: 1500px;
    height: 80vh;
    max-height: 1200px;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.719);
    background-color: rgba(0, 0, 0, 0.589);
    overflow-x: auto; /* Enable horizontal scroll if needed */
  }
  
  /*.content-section {
    display: flex;
    flex-direction: row; /* Arrange lists horizontally 
    flex-wrap: nowrap; /* Ensure lists stay in a single row 
    overflow-x: auto; /* Enable horizontal scroll if needed 
    padding: 10px;
  }*/
  
  .content-section {
    display: flex;
    flex-direction: row; /* Alinea las listas horizontalmente */
    flex-wrap: nowrap; /* Evita que las listas se envuelvan a la siguiente línea */
    overflow-x: auto; /* Habilita el desplazamiento horizontal si las listas se desbordan */
    padding: 10px;
  }
  
  .list-wrapper {
    margin-bottom: 20px; /* Margen inferior de 20px */
    padding: 10px;
    border-radius: 10px;
    flex: 0 0 auto; /* Evita que el contenedor de la lista se reduzca */
    display: flex; /* Para asegurar que la lista se ajuste al contenido */
    flex-direction: column; /* Asegura que el contenido de la lista se alinee verticalmente */
  }
  
  .list {
    background-color: #0000008f;
    color: #fff;
    padding: 10px;
    border-radius: 10px;
    margin: 0; /* Elimina márgenes innecesarios */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px; /* Ancho fijo para la lista */
    flex: 0 0 auto; /* Evita que la lista se reduzca */
  }
  
  .card {
    background-color: #096fdd;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    margin: 5px 0;
    cursor: pointer;
    position: relative; /* Added for positioning of buttons */
  }
  
  .remove-card,
  .edit-card {
    position: absolute;
    top: 5px;
    cursor: pointer;
  }
  
  .remove-card {
    right: 5px;
    font-size: 12px;
  }
  
  .edit-card {
    right: 25px; /* Adjust position to the left of remove card */
    font-size: 12px;
  }
  
  .edit-card img {
    width: 15px;
    height: 15px;
    filter: invert(100%);
  }
  
  .card:hover {
    background-color: #055aaf;
  }
  
  .card:hover .edit-card img {
    opacity: 0.8; /* Slightly dim icon on hover */
  }
  
  .remove-card:hover {
    color: #f00;
  }
  
  .edit-card:hover {
    filter: invert(100%);
  }
  </style>