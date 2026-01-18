#!/bin/bash

# Script de Verificação SEO para leorodrigues.dev
# Verifica: sitemap, robots.txt, páginas principais, meta tags

echo "🔍 Verificando SEO do site leorodrigues.dev..."
echo ""

BASE_URL="https://www.leorodrigues.dev"
ERRORS=0

# Função para verificar URL
check_url() {
    local url=$1
    local name=$2
    
    echo -n "Verificando $name... "
    
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$HTTP_CODE" -eq 200 ]; then
        echo "✅ OK (HTTP $HTTP_CODE)"
        return 0
    else
        echo "❌ ERRO (HTTP $HTTP_CODE)"
        ERRORS=$((ERRORS + 1))
        return 1
    fi
}

# Função para verificar conteúdo
check_content() {
    local url=$1
    local pattern=$2
    local name=$3
    
    echo -n "Verificando $name... "
    
    if curl -s "$url" | grep -q "$pattern"; then
        echo "✅ OK"
        return 0
    else
        echo "❌ ERRO (padrão não encontrado)"
        ERRORS=$((ERRORS + 1))
        return 1
    fi
}

# Verificações de URLs
echo "📋 Verificando URLs principais:"
check_url "$BASE_URL" "Homepage"
check_url "$BASE_URL/about" "Página About"
check_url "$BASE_URL/services" "Página Services"
check_url "$BASE_URL/projects" "Página Projects"
check_url "$BASE_URL/sitemap.xml" "Sitemap"
check_url "$BASE_URL/robots.txt" "Robots.txt"
echo ""

# Verificações de conteúdo
echo "📋 Verificando conteúdo:"
check_content "$BASE_URL/sitemap.xml" "leorodrigues.dev" "Sitemap contém URLs"
check_content "$BASE_URL/sitemap.xml" "/services" "Sitemap contém /services"
check_content "$BASE_URL/robots.txt" "Sitemap:" "Robots.txt referencia sitemap"
check_content "$BASE_URL" "google-site-verification" "Meta tag de verificação Google"
check_content "$BASE_URL" "MCCPSESPM5MMVGw-lXb_pL40db1Z6VMT" "Código de verificação correto"
echo ""

# Verificar meta tags importantes
echo "📋 Verificando Meta Tags:"
check_content "$BASE_URL" 'meta name="description"' "Meta description presente"
check_content "$BASE_URL" 'meta property="og:title"' "Open Graph title presente"
check_content "$BASE_URL" 'meta property="og:description"' "Open Graph description presente"
check_content "$BASE_URL" 'link rel="canonical"' "Canonical URL presente"
echo ""

# Resumo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ]; then
    echo "✅ Todas as verificações passaram!"
    echo ""
    echo "📝 Próximos passos:"
    echo "   1. Acesse: https://search.google.com/search-console"
    echo "   2. Adicione propriedade: https://leorodrigues.dev"
    echo "   3. Verifique usando código: MCCPSESPM5MMVGw-lXb_pL40db1Z6VMT"
    echo "   4. Envie sitemap: sitemap.xml"
    exit 0
else
    echo "❌ Encontrados $ERRORS erro(s). Verifique acima."
    exit 1
fi
