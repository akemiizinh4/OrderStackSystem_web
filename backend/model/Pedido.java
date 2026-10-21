package backend.model;

import java.util.ArrayList;

public class Pedido {
    private Cliente cliente;
    private ArrayList<Produto> itens;
    private String status;
    private double precoTotal;

    public Pedido(Cliente cliente) {
        this.cliente = cliente;
        this.itens = new ArrayList<>();
        this.status = "PENDENTE";
        this.precoTotal = 0.0;
    }

    public void adicionarItem(Produto p) {
        itens.add(p);
        precoTotal += p.getPreco();
    }

    @Override
    public String toString() {
        StringBuilder listaComidas = new StringBuilder();
        for (Produto p : itens) {
            listaComidas.append("\n      - ").append(p.getNome());
        }
        
        return "Pedido de " + cliente.getNome() 
               + " | Status: " + status
               + " | Total: R$ " + precoTotal
               + "\n   Comidas:" + listaComidas.toString();
    }
}