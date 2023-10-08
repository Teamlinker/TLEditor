import Editor from "./editor/index.vue"

export { Editor };

const  root= {
    install(App:any) {
        App.component("tl-editor", Editor);
    },
};

export default root;