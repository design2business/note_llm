import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  notebookId: string;
  timestamp: string;
  preview?: string;
  lastUpdated: number;
}

// 简单的内存存储
let notes: Note[] = [];

export async function POST(request: Request) {
  try {
    const { title, content, tags, notebookId } = await request.json();
    
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const now = Date.now();
    const newNote: Note = {
      id: `note-${uuidv4()}`,
      title,
      content,
      tags: tags || [],
      notebookId: notebookId || "default",
      timestamp: new Date().toISOString(),
      preview: content.substring(0, 60) + (content.length > 60 ? '...' : ''),
      lastUpdated: now,
    };

    notes.push(newNote);

    return NextResponse.json(newNote);
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(notes);
} 