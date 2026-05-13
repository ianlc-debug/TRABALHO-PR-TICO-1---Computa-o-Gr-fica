# 👟 E-commerce 3D de Tênis

Este projeto é um protótipo de e-commerce interativo que utiliza **Three.js** para renderizar modelos de calçados em tempo real diretamente no navegador. O usuário pode visualizar, girar e personalizar produtos de marcas como Nike e Adidas em um ambiente tridimensional.

---

## 🚀 Funcionalidades

*   **Visualização Interativa:** Rotação de 360°, zoom e movimentação de câmera.
*   **Seleção de Marcas:** Alternância rápida entre modelos da **Nike** e **Adidas**.
*   **Customização Dinâmica:** Alteração de cores de partes específicas do tênis ou do objeto inteiro.
*   **Iluminação Realista:** Controle de brilho da luz e uso de ambiente HDRI.
*   **Base Rotatória:** O tênis é exibido sobre uma base de madeira que gira automaticamente.

---

## 🛠️ Tecnologias Utilizadas

*   **Three.js**: Biblioteca principal para renderização 3D.
*   **JavaScript (ES6+)**: Lógica de interação e controle de materiais.
*   **HTML5 & CSS3**: Interface de menus e layout responsivo.
*   **GLTFLoader**: Carregamento dos modelos 3D (.glb).

---

## 💻 Como Executar

Devido às políticas de segurança de navegadores (CORS), o projeto deve ser rodado em um servidor local:

1.  **Via VS Code:**
    *   Instale a extensão **Live Server**.
    *   Clique com o botão direito no arquivo `index.html`.
    *   Selecione **"Open with Live Server"**.
2.  **Via Terminal (Python):**
    *   Na pasta do projeto, digite: `python -m http.server`.
    *   Acesse `http://localhost:8000` no seu navegador.

---

## 🎨 Como Customizar (Direto no Código)

Você pode ajustar o comportamento do projeto modificando os seguintes pontos:

### 1. Mudança de Cores
Para adicionar ou alterar as cores disponíveis no painel:
*   No **HTML**, localize a `div` com a classe `.color-picker`.
*   Altere o atributo `data-color` (usado pelo JavaScript) e o `style="background: ..."` (exibido para o usuário).
*   *Exemplo:* `<button class="color-part-btn" data-color="#FF5733" style="background: #FF5733;"></button>`

### 2. Ajuste de Iluminação
Para alterar a intensidade padrão ou os limites de luz:
*   No **HTML**, procure o input com ID `lightIntensity`. 
*   Altere o `value` para mudar o brilho inicial ou `max` para permitir luzes mais fortes.
*   No **JavaScript**, você pode mudar a cor da luz principal na linha: `mainLight = new THREE.DirectionalLight(0xffffff, 2);` (alterando o hexadecimal).

### 3. Velocidade de Rotação da Plataforma
A plataforma de madeira gira automaticamente para exibir o produto. Para ajustar isso:
*   **Via Interface:** Use o slider "Velocidade de rotação".
*   **Via Código (Valor Inicial):** No **JavaScript**, altere a variável `let rotationSpeed = 0.01;`.
*   **Limites do Slider:** No **HTML**, altere os atributos `min`, `max` e `step` do input `speedControl`.

### 4. Identificar Partes do Tênis
Ao carregar um modelo, abra o **Console do Navegador (F12)**. O código lista o nome de cada peça (ex: `Object_2`, `Object_3`). 
Para permitir que o usuário pinte uma peça específica, adicione o nome dela no `<select>` do HTML:
```html
<option value="NOME_DA_PECA_VISTO_NO_CONSOLE">Descrição da Peça</option>
