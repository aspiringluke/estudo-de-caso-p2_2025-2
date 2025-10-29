import { knex } from "../config/db.js";

export class OrdemServico
{
    async criarNova(dadosOS) {
        try {
            const novaOS = {
                cliente_nome: dadosOS.cliente_nome,
                equipamento: dadosOS.equipamento,
                descricao_problema: dadosOS.descricao_problema,
                status: "Aberto"
            };

            const result = await knex("ordens_servico")
                .insert(novaOS)
                .returning("*");

            if (result.length === 0) {
                return { success: false, message: "Falha ao criar a ordem de serviço." };
            }

            return { success: true, values: result[0] };

        } catch (error) {
            return { success: false, message: error };
        }
    }

    async consultarTodas()
    {
        try {
            const result = await knex("ordens_servico").select("*");
            
            if(result.length === 0)
            {
                return {success: false, message: "Não há ordens de serviço"};
            }
            
            return {success: true, values: result};
        } catch (error) {
            return {success: false, message: error};
        }
    }

    async consultarUma(id)
    {
        try {
            const result = await knex("ordens_servico").where({ id }).first();

            if(!result)
            {
                return {success: false, message: "Ordem de serviço não encontrada"};
            }

            return {success: true, values: result};
        } catch (error) {
            return {success: false, message: error};
        }
    }

    async concluirUma(id)
    {
        try {
            const result = await knex("ordens_servico")
                .where({ id })
                .update({ status: "Concluído" })
                .returning("*");

            if(result.length === 0)
            {
                return {success: false, message: "Ordem de serviço não encontrada para concluir"};
            }

            return {success: true, values: result[0]}; 
        } catch (error) {
            return {success: false, message: error};
        }
    }

    async deletarUma(id)
    {
        try {
            const result = await knex("ordens_servico")
                .where({ id })
                .del()
                .returning("*");

            if(result.length === 0)
            {
                return {success: false, message: "Ordem de serviço não encontrada para deletar"};
            }

            return {success: true, values: result[0]};
        } catch(error) {
            return {success: false, message: error};
        }
    }
}
