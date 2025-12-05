// app/API/database.ts
import { supabase } from './Database/supabaseClient';

/**
 * Example: Fetch data from a table
 * @param tableName - Tên bảng trong database
 */
export async function fetchData(tableName: string) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*');

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { success: false, error };
  }
}

/**
 * Example: Insert data into a table
 * @param tableName - Tên bảng trong database
 * @param insertData - Dữ liệu cần insert
 */
export async function insertData(tableName: string, insertData: any) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .insert(insertData)
      .select();

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error inserting data:', error);
    return { success: false, error };
  }
}

/**
 * Example: Update data in a table
 * @param tableName - Tên bảng trong database
 * @param id - ID của record cần update
 * @param updateData - Dữ liệu cần update
 */
export async function updateData(tableName: string, id: string | number, updateData: any) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error updating data:', error);
    return { success: false, error };
  }
}

/**
 * Example: Delete data from a table
 * @param tableName - Tên bảng trong database
 * @param id - ID của record cần xóa
 */
export async function deleteData(tableName: string, id: string | number) {
  try {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting data:', error);
    return { success: false, error };
  }
}

/**
 * Example: Search data with filters
 * @param tableName - Tên bảng trong database
 * @param column - Tên cột để search
 * @param value - Giá trị cần tìm
 */
export async function searchData(tableName: string, column: string, value: any) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq(column, value);

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error searching data:', error);
    return { success: false, error };
  }
}

