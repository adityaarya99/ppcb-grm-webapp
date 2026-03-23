/**
 * Example API Route
 * GET /api/example - Returns example data
 * POST /api/example - Creates example data
 */

import { NextResponse } from 'next/server';

// Sample data (replace with database in production)
const sampleData = [
    { id: 1, title: 'Example Item 1', status: 'active' },
    { id: 2, title: 'Example Item 2', status: 'pending' },
    { id: 3, title: 'Example Item 3', status: 'completed' },
];

/**
 * GET handler
 * Returns a list of example items
 */
export async function GET(request) {
    try {
        // Parse query parameters
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);

        // Filter data if status is provided
        let filteredData = status
            ? sampleData.filter((item) => item.status === status)
            : sampleData;

        // Pagination
        const startIndex = (page - 1) * limit;
        const paginatedData = filteredData.slice(startIndex, startIndex + limit);

        return NextResponse.json({
            success: true,
            data: paginatedData,
            pagination: {
                page,
                limit,
                total: filteredData.length,
                totalPages: Math.ceil(filteredData.length / limit),
            },
        });
    } catch (error) {
        console.error('GET /api/example error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * POST handler
 * Creates a new example item
 */
export async function POST(request) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.title) {
            return NextResponse.json(
                { success: false, error: 'Title is required' },
                { status: 400 }
            );
        }

        // Create new item
        const newItem = {
            id: Date.now(),
            title: body.title,
            status: body.status || 'pending',
            createdAt: new Date().toISOString(),
        };

        // In production, save to database here
        // await db.items.create(newItem);

        return NextResponse.json(
            { success: true, data: newItem },
            { status: 201 }
        );
    } catch (error) {
        console.error('POST /api/example error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
