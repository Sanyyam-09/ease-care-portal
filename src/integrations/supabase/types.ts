export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          created_at: string
          doctor_id: string
          id: string
          notes: string | null
          patient_id: string
          status: string
          time_slot: string
        }
        Insert: {
          appointment_date: string
          created_at?: string
          doctor_id: string
          id?: string
          notes?: string | null
          patient_id: string
          status?: string
          time_slot: string
        }
        Update: {
          appointment_date?: string
          created_at?: string
          doctor_id?: string
          id?: string
          notes?: string | null
          patient_id?: string
          status?: string
          time_slot?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      doctor_reviews: {
        Row: {
          created_at: string
          doctor_id: string
          id: string
          rating: number
          review_text: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          doctor_id: string
          id?: string
          rating: number
          review_text?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          doctor_id?: string
          id?: string
          rating?: number
          review_text?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctor_reviews_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      doctors: {
        Row: {
          available: boolean | null
          avatar_initials: string | null
          bio: string | null
          certificate_url: string | null
          certificate_verified: boolean | null
          city: string | null
          consultation_fee: number | null
          created_at: string
          experience_years: number | null
          hospital: string | null
          id: string
          languages: string[] | null
          location: string | null
          name: string
          qualification: string | null
          rating: number | null
          specialty: string
          state: string | null
          total_reviews: number | null
          trust_score: number | null
        }
        Insert: {
          available?: boolean | null
          avatar_initials?: string | null
          bio?: string | null
          certificate_url?: string | null
          certificate_verified?: boolean | null
          city?: string | null
          consultation_fee?: number | null
          created_at?: string
          experience_years?: number | null
          hospital?: string | null
          id?: string
          languages?: string[] | null
          location?: string | null
          name: string
          qualification?: string | null
          rating?: number | null
          specialty: string
          state?: string | null
          total_reviews?: number | null
          trust_score?: number | null
        }
        Update: {
          available?: boolean | null
          avatar_initials?: string | null
          bio?: string | null
          certificate_url?: string | null
          certificate_verified?: boolean | null
          city?: string | null
          consultation_fee?: number | null
          created_at?: string
          experience_years?: number | null
          hospital?: string | null
          id?: string
          languages?: string[] | null
          location?: string | null
          name?: string
          qualification?: string | null
          rating?: number | null
          specialty?: string
          state?: string | null
          total_reviews?: number | null
          trust_score?: number | null
        }
        Relationships: []
      }
      government_schemes: {
        Row: {
          applicable_states: string[] | null
          benefits: string | null
          coverage_amount: number | null
          description: string | null
          eligibility_criteria: string | null
          id: string
          is_active: boolean | null
          name: string
          website_url: string | null
        }
        Insert: {
          applicable_states?: string[] | null
          benefits?: string | null
          coverage_amount?: number | null
          description?: string | null
          eligibility_criteria?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          website_url?: string | null
        }
        Update: {
          applicable_states?: string[] | null
          benefits?: string | null
          coverage_amount?: number | null
          description?: string | null
          eligibility_criteria?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          website_url?: string | null
        }
        Relationships: []
      }
      hospital_rooms: {
        Row: {
          amenities: string[] | null
          description: string | null
          hospital_id: string
          id: string
          image_url: string | null
          price_per_day: number | null
          room_type: string
        }
        Insert: {
          amenities?: string[] | null
          description?: string | null
          hospital_id: string
          id?: string
          image_url?: string | null
          price_per_day?: number | null
          room_type: string
        }
        Update: {
          amenities?: string[] | null
          description?: string | null
          hospital_id?: string
          id?: string
          image_url?: string | null
          price_per_day?: number | null
          room_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "hospital_rooms_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      hospitals: {
        Row: {
          accreditation: string | null
          certificate_verified: boolean | null
          city: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          location: string | null
          name: string
          offers: string[] | null
          rating: number | null
          state: string | null
          total_reviews: number | null
          trust_score: number | null
        }
        Insert: {
          accreditation?: string | null
          certificate_verified?: boolean | null
          city?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          name: string
          offers?: string[] | null
          rating?: number | null
          state?: string | null
          total_reviews?: number | null
          trust_score?: number | null
        }
        Update: {
          accreditation?: string | null
          certificate_verified?: boolean | null
          city?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          name?: string
          offers?: string[] | null
          rating?: number | null
          state?: string | null
          total_reviews?: number | null
          trust_score?: number | null
        }
        Relationships: []
      }
      medical_records: {
        Row: {
          description: string | null
          file_name: string
          file_type: string | null
          file_url: string
          id: string
          record_type: string
          uploaded_at: string
          user_id: string
        }
        Insert: {
          description?: string | null
          file_name: string
          file_type?: string | null
          file_url: string
          id?: string
          record_type?: string
          uploaded_at?: string
          user_id: string
        }
        Update: {
          description?: string | null
          file_name?: string
          file_type?: string | null
          file_url?: string
          id?: string
          record_type?: string
          uploaded_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ngo_services: {
        Row: {
          city: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          description: string | null
          event_date: string | null
          event_time: string | null
          id: string
          is_active: boolean | null
          location: string | null
          ngo_name: string
          service_type: string
          state: string | null
        }
        Insert: {
          city?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          event_date?: string | null
          event_time?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          ngo_name: string
          service_type: string
          state?: string | null
        }
        Update: {
          city?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          event_date?: string | null
          event_time?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          ngo_name?: string
          service_type?: string
          state?: string | null
        }
        Relationships: []
      }
      procedure_pricing: {
        Row: {
          anesthesia_fee: number | null
          base_price: number
          category: string | null
          hospital_id: string
          id: string
          medicine_cost: number | null
          misc_charges: number | null
          notes: string | null
          nursing_charges: number | null
          procedure_name: string
          room_charges: number | null
          surgeon_fee: number | null
          total_estimate: number
        }
        Insert: {
          anesthesia_fee?: number | null
          base_price: number
          category?: string | null
          hospital_id: string
          id?: string
          medicine_cost?: number | null
          misc_charges?: number | null
          notes?: string | null
          nursing_charges?: number | null
          procedure_name: string
          room_charges?: number | null
          surgeon_fee?: number | null
          total_estimate: number
        }
        Update: {
          anesthesia_fee?: number | null
          base_price?: number
          category?: string | null
          hospital_id?: string
          id?: string
          medicine_cost?: number | null
          misc_charges?: number | null
          notes?: string | null
          nursing_charges?: number | null
          procedure_name?: string
          room_charges?: number | null
          surgeon_fee?: number | null
          total_estimate?: number
        }
        Relationships: [
          {
            foreignKeyName: "procedure_pricing_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          city: string | null
          created_at: string
          date_of_birth: string | null
          full_name: string | null
          gender: string | null
          id: string
          phone: string | null
          pin_code: string | null
          state: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          phone?: string | null
          pin_code?: string | null
          state?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          phone?: string | null
          pin_code?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "doctor" | "patient"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "doctor", "patient"],
    },
  },
} as const
