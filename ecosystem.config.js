// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "coupon-server", // Nome da sua aplicação
      script: "./dist/server.js", // Caminho para o arquivo JS compilado (pós-build)
      instances: "max", // Inicia o máximo de instâncias possível com base nas CPUs
      exec_mode: "cluster", // Ativa o modo cluster do Node.js (load balancing)
      watch: false, // Não monitorar arquivos em produção (use apenas em dev)
      max_memory_restart: "1G", // Reinicia se o uso de memória exceder 1GB
      env: {
        NODE_ENV: "production", // Garante que o ambiente seja de produção
        PORT: 3000, // Porta da sua aplicação, pode ser sobrescrita por variáveis de ambiente do sistema
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 80, // Exemplo para porta 80 em produção (pode exigir sudo/privilégios)
      },
    },
  ],
};
