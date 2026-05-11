package backend.util;

import java.util.ArrayList;
import java.util.Scanner;
import backend.model.Produto;

public class LaboratorioOrdenacao {
    public static void iniciar(ArrayList<Produto> cardapioOriginal) {
        Scanner sc = new Scanner(System.in);
        ArrayList<Produto> lista = new ArrayList<>(cardapioOriginal);

        System.out.println("\n=======================================================");
        System.out.println("     LABORATORIO INTERATIVO DE ORDENACAO               ");
        System.out.println("=======================================================");

        System.out.print("Escolha o algoritmo:\n1. Bubble Sort (O(n2) - por preco)\n2. Quick Sort (O(n log n) - por nome)\nEscolha: ");
        int escolha = sc.nextInt();
        sc.nextLine();

        if (escolha == 1) {
            bubbleSortInterativo(lista, sc);
        } else if (escolha == 2) {
            quickSortInterativo(lista, sc);
        } else {
            System.out.println("[ERRO] Opcao invalida!");
        }
    }

    private static void bubbleSortInterativo(ArrayList<Produto> lista, Scanner sc) {
        int n = lista.size();
        int comparacoes = 0, trocas = 0;
        System.out.println("\n=== BUBBLE SORT INTERATIVO (O(n2)) ===");
        for (int i = 0; i < n - 1; i++) {
            System.out.println("[INFO] Passo " + (i + 1));
            imprimirListaVisual(lista, i);
            boolean trocou = false;
            for (int j = 0; j < n - i - 1; j++) {
                comparacoes++;
                if (lista.get(j).getPreco() > lista.get(j + 1).getPreco()) {
                    trocas++;
                    trocou = true;
                    Produto temp = lista.get(j);
                    lista.set(j, lista.get(j + 1));
                    lista.set(j + 1, temp);
                }
                imprimirListaVisual(lista, i);
                System.out.println("Pressione ENTER para continuar...");
                sc.nextLine();
            }
            if (!trocou) break;
        }
        System.out.println("\n[OK] ORDENACAO CONCLUIDA!");
        imprimirListaVisual(lista, -1);
        System.out.printf("Comparacoes: %d | Trocas: %d%n", comparacoes, trocas);
        sc.nextLine();
    }

    private static void quickSortInterativo(ArrayList<Produto> lista, Scanner sc) {
        System.out.println("\n=== QUICK SORT INTERATIVO (O(n log n)) ===");
        quickSortHelper(lista, 0, lista.size() - 1, sc, 0);
        System.out.println("\n[OK] ORDENACAO CONCLUIDA!");
        imprimirListaVisual(lista, -1);
        sc.nextLine();
    }

    private static void quickSortHelper(ArrayList<Produto> lista, int baixo, int alto, Scanner sc, int nivel) {
        if (baixo < alto) {
            System.out.println("[INFO] Particao (nivel " + nivel + ") baixo=" + baixo + " alto=" + alto);
            imprimirListaVisual(lista, -1);
            int pi = partition(lista, baixo, alto);
            imprimirListaVisual(lista, pi);
            System.out.println("Pressione ENTER para continuar...");
            sc.nextLine();
            quickSortHelper(lista, baixo, pi - 1, sc, nivel + 1);
            quickSortHelper(lista, pi + 1, alto, sc, nivel + 1);
        }
    }

    private static int partition(ArrayList<Produto> lista, int baixo, int alto) {
        String pivo = lista.get(alto).getNome();
        int i = baixo - 1;
        for (int j = baixo; j < alto; j++) {
            if (lista.get(j).getNome().compareToIgnoreCase(pivo) <= 0) {
                i++;
                Produto temp = lista.get(i);
                lista.set(i, lista.get(j));
                lista.set(j, temp);
            }
        }
        Produto temp = lista.get(i + 1);
        lista.set(i + 1, lista.get(alto));
        lista.set(alto, temp);
        return i + 1;
    }

    private static void imprimirListaVisual(ArrayList<Produto> lista, int destaque) {
        System.out.print("[ ");
        for (int k = 0; k < lista.size(); k++) {
            if(k == destaque) System.out.printf(">%.0f< ", lista.get(k).getPreco());
            else System.out.printf("%.0f ", lista.get(k).getPreco());
        }
        System.out.println("]");
    }
}