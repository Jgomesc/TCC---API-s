import { con } from "./connection.js";

// // CADASTRAR PRODUTO  // //               // // CADASTRAR PRODUTO  // //              // // CADASTRAR PRODUTO  // //              // // CADASTRAR PRODUTO  // // 
export async function novoProduto(produto) {
    const comando =

        `
        insert into tb_produto (NM_PRODUTO, VL_PRECO_DE,  VL_PRECO_POR, VL_MAX_PARCELAS ,QTD_ITENS ,BL_CATEGORIA_DIARIA , DS_DESCRICAO)
                        values (?,?, ?, ?, ?, ?, ? )   `


    const [resp] = await con.query(comando, [
        produto.nome,
        produto.precoDe,
        produto.precoPor,
        produto.maxParcelas,
        produto.qtdItens,
        produto.categoriaDiaria,
        produto.descricao
    ])
    return resp.insertId;
}

export async function salvarProdutoCategoria(idCategoria, idProduto) {
    const comando =
        ` insert into tb_produto_categoria (ID_CATEGORIA, ID_PRODUTO)
                                  values (?, ?) `


    const [resp] = await con.query(comando, [idCategoria, idProduto])
}

export async function salvarProdutoCor(idCor, idProduto) {
    const comando =
        ` insert into tb_produto_cor (ID_COR, ID_PRODUTO)
                                  values (?, ? ) `


    const [resp] = await con.query(comando, [idCor, idProduto])
}

export async function salvarProdutoTamanho(idTamanho, idProduto) {
    const comando =
        ` insert into tb_produto_tamanho (ID_TAMANHO, ID_PRODUTO)
                                  values (?, ?) 
    `
    console.log(idTamanho)
    console.log(idProduto)


    const [resp] = await con.query(comando, [idTamanho, idProduto])
}
export async function salvarProdutoMarca(idMarca, idProduto) {
    const comando =
        `  insert into tb_produto_marca (ID_MARCA,ID_PRODUTO)
                              values (?, ?)
    `


    const [resp] = await con.query(comando, [idMarca, idProduto])
}
// CONSULTAR PRODUTOS // // CONSULTAR PRODUTOS // // CONSULTAR PRODUTOS // // CONSULTAR PRODUTOS // 

export async function consultarProdutos() {
    const comando =
        `
    SELECT 
    ID_PRODUTO as id,
    NM_PRODUTO as nome,
    VL_PRECO_DE as precoInicial,
    VL_PRECO_POR as precoFinal,
    VL_MAX_PARCELAS as parcelas,
    QTD_ITENS as quantidade,
    BL_CATEGORIA_DIARIA as diaria,
    DS_DESCRICAO as descricao
    FROM tb_produto
    `
    const [linhas] = await con.query(comando);
    return linhas;

}

export async function consultarMarcas() {
    const comando =
        `
    SELECT 
    ID_MARCA as id,
    NM_MARCA as marca,
    FROM tb_marca
    `
    const [linhas] = await con.query(comando);
    return linhas;
}
export async function consultarTamanhos() {
    const comando =
        `
    SELECT 
    ID_TAMANHO as id,
    DS_TAMANHO as tamanho,
    FROM tb_tamanho
    `
    const [linhas] = await con.query(comando);
    return linhas;
}

export async function consultarCores() {
    const comando =
        `
    SELECT 
    ID_COR as id,
    DS_COR as cor,
    FROM tb_cor
    `
    const [linhas] = await con.query(comando);
    return linhas;
}

export async function consultarCategorias() {
    const comando =
        `
    SELECT 
    ID_CATEGORIA as id,
    NM_CATEGORIA as categoria,
    FROM tb_categoria
    `
    const [linhas] = await con.query(comando);
    return linhas;
}

// ALTERAR PRODUTO // // ALTERAR PRODUTO // // ALTERAR PRODUTO // // ALTERAR PRODUTO // 

export async function alterarProduto(id, produto) {
    const comando =
        `
         UPDATE     tb_produto 
            SET     NM_PRODUTO = ?, 
                    VL_PRECO_DE = ?,  
                    VL_PRECO_POR = ?, 
                    VL_MAX_PARCELAS = ?,
                    QTD_ITENS = ?,
                    BL_CATEGORIA_DIARIA = ? , 
                    DS_DESCRICAO = ? 
                    WHERE ID_PRODUTO = ? `

    const [resp] = await con.query(comando, [

        produto.nome,
        produto.precoDe,
        produto.precoPor,
        produto.maxParcelas,
        produto.qtdItens,
        produto.categoriaDiaria,
        produto.descricao,
        id
    ])
    return resp.affectedRows;
}

export async function alterarMarca(marca) {
    const comando = `
    update tb_marca (NM_PRODUTO)
    values (?) 
    `
    const [resp] = await con.query(comando, [
        marca.nome,
    ])
    return resp.affectedRows;
}

export async function alterarTamanho(tamanho) {
    const comando = `
    update tb_tamanho (DS_TAMANHO)
    values (?) 
    `
    const [resp] = await con.query(comando, [
        tamanho.nome,
    ])
    return resp.affectedRows;
}

export async function alterarCor(cor) {
    const comando = `
    update tb_cor (DS_COR)
    values (?) 
    `
    const [resp] = await con.query(comando, [
        cor.nome,
    ])
    return resp.affectedRows;
}

export async function alterarCategoria(categoria) {
    const comando = `
    update tb_categoria (NM_CATEGORIA)
    values (?) 
    `
    const [resp] = await con.query(comando, [
        categoria.nome,
    ])
    return resp.affectedRows;
}


export async function salvarProdutoImagem(idProduto, imagemPath) {
    const comando =
        `insert into tb_produto_imagem (ID_PRODUTO, DS_IMAGEM)
                                 values (?, ?)`


    const [resp] = await con.query(comando, [idProduto, imagemPath])

    return resp.affectedRows
}

// // PRODUTO ESTOQUE // //             // // PRODUTO ESTOQUE // //             // // PRODUTO ESTOQUE // //             // // PRODUTO ESTOQUE // //

export async function buscarProdutos() {
    const comando = `
    select tb_produto.ID_PRODUTO as id,
    NM_PRODUTO     as produto, 
    VL_PRECO_DE    as preco,
    QTD_ITENS      as quantidade,
    NM_MARCA       as marca
    from tb_produto 
    inner join tb_produto_marca on tb_produto_marca.ID_PRODUTO = tb_produto.ID_PRODUTO
    inner join tb_marca on tb_marca.ID_MARCA = tb_produto_marca.ID_MARCA 
    `
    const [registros] = await con.query(comando);
    return registros;
}
// PROCURAR PRODUTO // // PROCURAR PRODUTO // // PROCURAR PRODUTO // // PROCURAR PRODUTO //
export async function procurarProdutoPorId(id){
    const comando = `
    SELECT 
    ID_PRODUTO as id,
    NM_PRODUTO as nome,
    VL_PRECO_DE as precoInicial,
    VL_PRECO_POR as precoFinal,
    VL_MAX_PARCELAS as parcelas,
    QTD_ITENS as quantidade,
    BL_CATEGORIA_DIARIA as diaria,
    DS_DESCRICAO as descricao
    FROM tb_produto
    WHERE id_produto = ?
    `
    const [registros] = await con.query(comando, [id]);
    return registros[0];
}

export async function procurarImagemPorId(idProduto){
    const comando = 
    `
    SELECT 
    DS_IMAGEM as imagem
    FROM tb_produto_imagem
    WHERE id_produto =  ?
    `
    const [linhas] = await con.query(comando, [idProduto]);
    return linhas.map(item => item.imagem); 
}
export async function procurarMarcaPorId(idProduto){
    const comando = 
    `
    SELECT 
    ID_MARCA as id
    FROM tb_produto_marca
    WHERE id_produto =  ?
    `
    const [linhas] = await con.query(comando , [idProduto]);
    return linhas.map(item => item.id); 
}
export async function procurarTamanhoPorId(idProduto){
    const comando = 
    `
    SELECT 
    ID_TAMANHO as id
    FROM tb_produto_tamanho
    WHERE id_produto =  ?
    `
    const [linhas] = await con.query(comando , [idProduto]);
    return linhas.map(item => item.id); 
}
export async function procurarCorPorId(idProduto){
    const comando = 
    `
    SELECT 
    ID_COR as id
    FROM tb_produto_cor
    WHERE id_produto =  ?
    `
    const [linhas] = await con.query(comando , [idProduto]);
    return linhas.map(item => item.id); 
}

export async function procurarCategoriasPorId(idProduto){
    const comando = 
    `
    SELECT 
    ID_CATEGORIA as id
    FROM tb_produto_categoria
    WHERE id_produto =  ?
    `
    const [linhas] = await con.query(comando , [idProduto]);
    return linhas.map(item => item.id); 
}

// REMOVER PRODUTO // // REMOVER PRODUTO // // REMOVER PRODUTO // // REMOVER PRODUTO // 

export async function removerProdutoMarcas(idProduto) {
    const comando =
        ` delete from tb_produto_marca
                                  where ID_PRODUTO =  ? `


    const [resp] = await con.query(comando, [idProduto])
    return resp.affectedRows
}

export async function removerProdutoTamanhos(idProduto) {
    const comando =
        `  delete from tb_produto_tamanho 
                                  where ID_PRODUTO =  ? `


    const [resp] = await con.query(comando, [idProduto])
    return resp.affectedRows
}

export async function removerProdutoCores(idProduto) {
    const comando =
        ` delete from tb_produto_cor 
                                  where ID_PRODUTO =  ? `


    const [resp] = await con.query(comando, [idProduto])
    return resp.affectedRows
}

export async function removerProdutoCategorias(idProduto) {
    const comando =
        ` delete from  tb_produto_categoria 
                                  where ID_PRODUTO =  ? `


    const [resp] = await con.query(comando, [idProduto])
    return resp.affectedRows
}

export async function removerProdutoImagens(idProduto) {
    const comando =
        ` delete from  tb_produto_imagem
                                  where ID_PRODUTO =  ? `


    const [resp] = await con.query(comando, [idProduto])
    return resp.affectedRows
}

export async function removerProduto(idProduto) {
    const comando =
        `delete from  tb_produto 
                                  where ID_PRODUTO =  ? `


    const [resp] = await con.query(comando, [idProduto])
    return resp.affectedRows
}

