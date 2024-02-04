export type PaymentOrder = {
    app_id: number,
    app_trans_id: string, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: string,
    app_time: number, // miliseconds
    item: string,
    embed_data: string,
    amount: number,
    description: string,
    bank_code: string,
}