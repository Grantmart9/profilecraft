import { supabase } from "./supabaseClient";

export async function uploadImage(file, folder = "images") {
  try {
    // Generate a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;
    
    // Upload the file
    const { error } = await supabase.storage
      .from('profile-images')
      .upload(filePath, file);
      
    if (error) {
      throw error;
    }
    
    // Get the public URL
    const { data } = supabase.storage
      .from('profile-images')
      .getPublicUrl(filePath);
      
    return data.publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}

export async function deleteImage(filePath) {
  try {
    const { error } = await supabase.storage
      .from('profile-images')
      .remove([filePath]);
      
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    return false;
  }
}