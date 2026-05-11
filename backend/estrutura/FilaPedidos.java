package backend.estrutura;

import backend.model.Pedido;

public class FilaPedidos {
    private Pedido[] fila;
    private int frente, tras, tamanho;

    public FilaPedidos(int capacidade) {
        fila = new Pedido[capacidade];
        frente = 0;
        tras = -1;
        tamanho = 0;
    }

    public void enqueue(Pedido pedido) {
        if (tamanho < fila.length) {
            tras = (tras + 1) % fila.length;
            fila[tras] = pedido;
            tamanho++;
        }
    }

    public Pedido dequeue() {
        if (tamanho > 0) {
            Pedido p = fila[frente];
            frente = (frente + 1) % fila.length;
            tamanho--;
            return p;
        }
        return null;
    }

    public int size() { return tamanho; }
    public boolean isEmpty() { return tamanho == 0; }
}