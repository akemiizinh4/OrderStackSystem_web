package backend.estrutura;

import java.util.HashMap;
import java.util.Map;
import backend.model.Produto;

public class PilhaCarrinho {
    private Produto[] pilha;
    private int topo;

    public PilhaCarrinho(int capacidade) {
        pilha = new Produto[capacidade];
        topo = -1;
    }

    public void push(Produto produto) {
        if (topo < pilha.length - 1) pilha[++topo] = produto;
    }

    public Produto pop() {
        if (topo >= 0) return pilha[topo--];
        return null;
    }

    public boolean isEmpty() { return topo == -1; }

    public void exibirCarrinho() {
        if (isEmpty()) {
            System.out.println("[ERRO] Carrinho vazio!");
            return;
        }
        Map<String, Integer> contagem = new HashMap<>();
        Map<String, Double> precoUnitario = new HashMap<>();
        double total = 0.0;
        for (int i = 0; i <= topo; i++) {
            if (pilha[i] != null) {
                String nome = pilha[i].getNome();
                contagem.put(nome, contagem.getOrDefault(nome, 0) + 1);
                precoUnitario.put(nome, pilha[i].getPreco());
                total += pilha[i].getPreco();
            }
        }
        System.out.println("\n=== SEU CARRINHO ===");
        for (Map.Entry<String, Integer> entry : contagem.entrySet()) {
            String nome = entry.getKey();
            int qtd = entry.getValue();
            double unit = precoUnitario.get(nome);
            double subtotal = qtd * unit;
            System.out.printf("%dx %s (R$ %.2f un.) = R$ %.2f%n", qtd, nome, unit, subtotal);
        }
        System.out.printf("%nPRECO TOTAL DO CARRINHO: R$ %.2f%n", total);
        System.out.println("=====================");
    }
}