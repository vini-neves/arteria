# 1. Instala as dependências apenas quando necessário
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# 2. Reconstrói o código fonte apenas quando necessário
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Desativa a telemetria do Next.js durante o build (opcional)
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# 3. Imagem de produção, copia todos os arquivos e roda o Next.js
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Configura as permissões corretas para o cache do prerender
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copia os arquivos gerados no build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# O Next.js standalone cria um server.js próprio
CMD ["node", "server.js"]