export async function get_cell_status_data() {
    try {
        const response = await fetch("/api/render_cell_status");
        if (!response.ok) {
            throw new Error("✖：取得エラー");
        }

        const result = await response.json();
        // console.log("取得完了:", result);
        return result;

    } catch (error) {
        console.error("取得エラー:", error);
        alert("取得エラーです");
        throw error; 
    }
}


export async function get_prod_num_data() {
    try {
        const response = await fetch("/api/prod_num");
        if (!response.ok) {
            throw new Error("✖：取得エラー");
        }

        const result = await response.json();
        // console.log("取得完了:", result);
        return result;

    } catch (error) {
        console.error("取得エラー:", error);
        alert("取得エラーです");
        throw error; 
    }
}