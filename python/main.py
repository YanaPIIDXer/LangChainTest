# 参考: https://qiita.com/tkmrsksk/items/7362f183138dfb324c50

import gradio as gr

with gr.Blocks() as demo:
    chatbot = gr.Chatbot()
    msg = gr.Textbox()
    clear = gr.Button("Clear")

    if __name__ == "__main__":
        print("Launch...")
        demo.launch(inbrowser=True)
