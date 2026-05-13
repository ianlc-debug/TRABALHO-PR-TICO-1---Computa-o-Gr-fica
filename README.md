# 👟 E-commerce 3D de Tênis

Projeto de vitrine virtual interativa desenvolvido com **HTML**, **CSS**, **JavaScript** e **Three.js**, permitindo a visualização de tênis em ambiente 3D com customização de cores, controle de iluminação e rotação dinâmica.

---

# 📸 Preview

O projeto apresenta:

- Visualização 3D de tênis em tempo real
- Ambiente HDRI realista
- Troca de modelos de tênis
- Controle de iluminação
- Alteração de cor do produto
- Base rotativa animada
- Controles de câmera com OrbitControls

---

# 🚀 Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES Modules)
- [Three.js](https://threejs.org/)
- GLTFLoader
- OrbitControls
- EXRLoader

---

# 📂 Estrutura do Projeto

```bash
📁 projeto/
│
├── index.html
├── style.css
├── main.js
│
├── 📁 models/
│   ├── nike_air_zoom_pegasus_36.glb
│   ├── adidas_ozelia.glb
│   └── ferndale_studio_04_4k.exr
│
├── 📁 logos/
│   ├── logo nike.png
│   └── logo adidas.png
│
└── 📁 textures/
    └── wood_texture/
    └── prata/
```

---

# ⚙️ Funcionalidades

## 🎨 Customização de Cor

O usuário pode alterar a cor do tênis através dos botões interativos.

Cores disponíveis:

- Vermelho
- Azul
- Branco
- Preto
- Verde

---

## 💡 Controle de Iluminação

Slider para ajuste da intensidade da luz direcional da cena.

```js
mainLight.intensity = parseFloat(e.target.value);
```

---

## 🔄 Controle de Rotação

Permite alterar a velocidade de rotação da base do produto.

```js
rotationSpeed = parseFloat(e.target.value);
```

---

## 👟 Troca de Modelos

O sistema permite carregar diferentes modelos `.glb` dinamicamente.

```js
loadShoe('nike_air_zoom_pegasus_36');
```

---

# 🧠 Conceitos 3D Aplicados

## 🌍 HDRI Environment

Uso de arquivo `.exr` para iluminação e reflexos realistas.

```js
scene.environment = texture;
scene.background = texture;
```

---

## 🪵 Materiais PBR

Aplicação de:

- Base Color
- Roughness
- Normal Map
- Metallic Map

Para criar superfícies realistas.

---

## 🎥 OrbitControls

Permite:

- Rotacionar câmera
- Zoom
- Navegação suave

```js
controls.enableDamping = true;
```

---

# ▶️ Como Executar o Projeto

## 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-projeto.git
```

---

## 2. Abra a pasta do projeto

```bash
cd seu-projeto
```

---

## 3. Execute um servidor local

Como o projeto usa módulos ES6 e carregamento de assets 3D, é necessário usar um servidor local.

### Usando VS Code + Live Server

Instale a extensão:

- Live Server

Depois:

- Clique com o botão direito em `index.html`
- Selecione `Open with Live Server`

---

# 📦 Dependências

As bibliotecas são carregadas diretamente via CDN:

```html
<script type="importmap">
{
  "imports": {
    "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
    "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
  }
}
</script>
```

---

# 🖼️ Assets Necessários

O projeto utiliza:

## Modelos 3D

- `.glb`

## Ambiente HDRI

- `.exr`

## Texturas PBR

- `.jpg`

---

# 🎮 Controles do Usuário

| Controle | Função |
|---|---|
| Botão esquerdo do Mouse | Rotacionar câmera |
| Scroll | Zoom |
| Slider de brilho | Ajustar iluminação |
| Slider de rotação | Velocidade da base |
| Botões de cor | Alterar cor do tênis |
| Botões de marca | Trocar modelo |

---

# 👨‍💻 Autores

Desenvolvido pela equipe 
- Antônio Matheus da Costa Queiroz
- Augusto Rodrigues Paz Gregório
- Davi Gomes Rocha
- Davi Moura Guedes
- Ian Lopes Costa
- José Arthur Gomes Azevedo
- Marcelo Henrique Teixeira de Souza Alves

---
