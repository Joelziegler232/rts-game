import { connect } from '@/app/libs/mongodb';
import UserInstance from '@/app/models/instance';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { newFullName: fullname, newEmail: email, newPassword: password } = await request.json();

        // Validar datos de entrada

        await connect();
        await UserInstance.findByIdAndUpdate(id, { fullname, email, password });

        return NextResponse.json({ message: "User updated" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}
