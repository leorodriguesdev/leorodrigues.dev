import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, properties } = body;

    // Aqui você pode enviar para um serviço de analytics customizado
    // Por exemplo: Mixpanel, Amplitude, ou seu próprio backend
    
    // Log para debug (remover em produção)
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics event:', event, properties);
    }

    // Você pode adicionar lógica aqui para salvar em banco de dados
    // ou enviar para outros serviços de analytics

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to track event:', error);
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    );
  }
}

