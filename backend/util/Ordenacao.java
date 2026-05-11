package backend.util;

import java.util.ArrayList;
import backend.model.Produto;

public class Ordenacao {
    public static void bubbleSortPreco(ArrayList<Produto> lista) {
        int n = lista.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (lista.get(j).getPreco() > lista.get(j + 1).getPreco()) {
                    Produto temp = lista.get(j);
                    lista.set(j, lista.get(j + 1));
                    lista.set(j + 1, temp);
                }
            }
        }
    }

    public static void quickSortNome(ArrayList<Produto> lista, int baixo, int alto) {
        if (baixo < alto) {
            int pi = partition(lista, baixo, alto);
            quickSortNome(lista, baixo, pi - 1);
            quickSortNome(lista, pi + 1, alto);
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
}