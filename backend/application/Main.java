package backend.application; 

import java.util.ArrayList;
import java.util.Scanner;

import backend.model.*;
import backend.estrutura.*;
import backend.util.*;
import backend.service.*;
import backend.web.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        ArrayList<Produto> cardapio = GerenciadorCardapio.inicializarCardapio();
        ArrayList<Cliente> clientes = new ArrayList<>();
        FilaPedidos filaCozinha = new FilaPedidos(50);
        DashboardPerformance dashboard = new DashboardPerformance();

        ServidorHttp.iniciar(filaCozinha, dashboard);

        Cliente clienteAtual = null;
        PilhaCarrinho carrinho = null;
        int opcao;

        do {
            System.out.println("\n=== JAPAN ENGLISH DELIVERY ===");
            System.out.println("1. Cadastro");
            System.out.println("2. Cardapio");
            System.out.println("3. Adicionar");
            System.out.println("4. Desfazer (Undo)");
            System.out.println("5. Carrinho");
            System.out.println("6. Finalizar");
            System.out.println("7. Cozinha");
            System.out.println("8. Dashboard");
            System.out.println("9. Lab Ordenacao");
            System.out.println("0. Sair");
            System.out.print("Escolha: ");
            opcao = sc.nextInt(); 
            sc.nextLine();

            switch (opcao) {
                case 1:
                    System.out.print("Nome: "); String n = sc.nextLine();
                    clienteAtual = new Cliente("000", n); 
                    clientes.add(clienteAtual);
                    carrinho = new PilhaCarrinho(100); 
                    System.out.println("[OK] Cadastrado!"); 
                    break;
                case 2:
                    System.out.println("1. Preco (Bubble) | 2. Nome (Quick)"); 
                    int t = sc.nextInt();
                    long start = System.nanoTime();
                    if (t == 1) { 
                        Ordenacao.bubbleSortPreco(cardapio); 
                        dashboard.registrarTempoBubble(System.nanoTime()-start); 
                    } else { 
                        Ordenacao.quickSortNome(cardapio, 0, cardapio.size()-1); 
                        dashboard.registrarTempoQuick(System.nanoTime()-start); 
                    }
                    for (Produto p : cardapio) System.out.println(p); 
                    break;
                case 3:
                    if (carrinho == null) { System.out.println("[ERRO] Faca o cadastro primeiro!"); break; }
                    System.out.print("ID: "); int id = sc.nextInt();
                    for (Produto p : cardapio) {
                        if (p.getId() == id) { 
                            carrinho.push(p); 
                            System.out.println("[OK] Adicionado!"); 
                        } 
                    }
                    break;
                case 4:
                    if (carrinho != null && !carrinho.isEmpty()) { 
                        Produto r = carrinho.pop(); 
                        dashboard.incrementarUndo();
                        System.out.println("[INFO] Desfeito: " + r.getNome()); 
                    } else {
                        System.out.println("[ERRO] Carrinho vazio!");
                    }
                    break;
                case 5: 
                    if (carrinho != null) carrinho.exibirCarrinho(); 
                    else System.out.println("[ERRO] Faca o cadastro primeiro!");
                    break;
                case 6:
                    if (carrinho == null || carrinho.isEmpty()) { System.out.println("[ERRO] Carrinho vazio!"); break; }
                    Pedido novo = new Pedido(clienteAtual);
                    while (!carrinho.isEmpty()) {
                        novo.adicionarItem(carrinho.pop());
                    }
                    filaCozinha.enqueue(novo); 
                    dashboard.incrementarPedidos();
                    System.out.println("[OK] Pedido finalizado!"); 
                    break;
                case 7:
                    Pedido prox = filaCozinha.dequeue();
                    if (prox != null) System.out.println("[COZINHA] Preparando:\n" + prox); 
                    else System.out.println("[OK] Fila vazia!"); 
                    break;
                case 8: 
                    dashboard.exibir(filaCozinha); 
                    break;
                case 9:
                    LaboratorioOrdenacao.iniciar(cardapio);
                    break;
            }
        } while (opcao != 0); 
        
        System.out.println("Saindo... Obrigado!");
        sc.close();
    }
}
