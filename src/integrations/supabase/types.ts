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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      asuntos: {
        Row: {
          abogado_id: string | null
          clasificacion_ia: string | null
          cliente_id: string | null
          created_at: string | null
          descripcion: string | null
          estado: string | null
          fecha_inicio: string | null
          fecha_proxima_audiencia: string | null
          firma_id: string
          id: string
          prioridad: string | null
          tipo: string | null
          titulo: string
          updated_at: string | null
        }
        Insert: {
          abogado_id?: string | null
          clasificacion_ia?: string | null
          cliente_id?: string | null
          created_at?: string | null
          descripcion?: string | null
          estado?: string | null
          fecha_inicio?: string | null
          fecha_proxima_audiencia?: string | null
          firma_id: string
          id?: string
          prioridad?: string | null
          tipo?: string | null
          titulo: string
          updated_at?: string | null
        }
        Update: {
          abogado_id?: string | null
          clasificacion_ia?: string | null
          cliente_id?: string | null
          created_at?: string | null
          descripcion?: string | null
          estado?: string | null
          fecha_inicio?: string | null
          fecha_proxima_audiencia?: string | null
          firma_id?: string
          id?: string
          prioridad?: string | null
          tipo?: string | null
          titulo?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asuntos_abogado_id_fkey"
            columns: ["abogado_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asuntos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asuntos_firma_id_fkey"
            columns: ["firma_id"]
            isOneToOne: false
            referencedRelation: "firmas"
            referencedColumns: ["id"]
          },
        ]
      }
      citas: {
        Row: {
          abogado_id: string | null
          cliente_id: string | null
          created_at: string | null
          descripcion: string | null
          duracion: number | null
          estado: string | null
          fecha: string
          firma_id: string
          id: string
          titulo: string
          ubicacion: string | null
          updated_at: string | null
        }
        Insert: {
          abogado_id?: string | null
          cliente_id?: string | null
          created_at?: string | null
          descripcion?: string | null
          duracion?: number | null
          estado?: string | null
          fecha: string
          firma_id: string
          id?: string
          titulo: string
          ubicacion?: string | null
          updated_at?: string | null
        }
        Update: {
          abogado_id?: string | null
          cliente_id?: string | null
          created_at?: string | null
          descripcion?: string | null
          duracion?: number | null
          estado?: string | null
          fecha?: string
          firma_id?: string
          id?: string
          titulo?: string
          ubicacion?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "citas_abogado_id_fkey"
            columns: ["abogado_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "citas_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "citas_firma_id_fkey"
            columns: ["firma_id"]
            isOneToOne: false
            referencedRelation: "firmas"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes: {
        Row: {
          created_at: string | null
          direccion: string | null
          email: string | null
          estado: string | null
          firma_id: string
          id: string
          nombre: string
          notas: string | null
          telefono: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          direccion?: string | null
          email?: string | null
          estado?: string | null
          firma_id: string
          id?: string
          nombre: string
          notas?: string | null
          telefono?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          direccion?: string | null
          email?: string | null
          estado?: string | null
          firma_id?: string
          id?: string
          nombre?: string
          notas?: string | null
          telefono?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clientes_firma_id_fkey"
            columns: ["firma_id"]
            isOneToOne: false
            referencedRelation: "firmas"
            referencedColumns: ["id"]
          },
        ]
      }
      documentos: {
        Row: {
          asunto_id: string | null
          created_at: string | null
          estado: string | null
          fecha_subida: string | null
          firma_id: string
          id: string
          nombre: string
          tamaño: string | null
          tipo: string | null
          updated_at: string | null
          url: string | null
        }
        Insert: {
          asunto_id?: string | null
          created_at?: string | null
          estado?: string | null
          fecha_subida?: string | null
          firma_id: string
          id?: string
          nombre: string
          tamaño?: string | null
          tipo?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          asunto_id?: string | null
          created_at?: string | null
          estado?: string | null
          fecha_subida?: string | null
          firma_id?: string
          id?: string
          nombre?: string
          tamaño?: string | null
          tipo?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documentos_asunto_id_fkey"
            columns: ["asunto_id"]
            isOneToOne: false
            referencedRelation: "asuntos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documentos_firma_id_fkey"
            columns: ["firma_id"]
            isOneToOne: false
            referencedRelation: "firmas"
            referencedColumns: ["id"]
          },
        ]
      }
      firmas: {
        Row: {
          color_primario: string | null
          created_at: string | null
          fecha_registro: string | null
          id: string
          logo_url: string | null
          nombre: string
          plan: string | null
          subdominio: string | null
          updated_at: string | null
        }
        Insert: {
          color_primario?: string | null
          created_at?: string | null
          fecha_registro?: string | null
          id?: string
          logo_url?: string | null
          nombre: string
          plan?: string | null
          subdominio?: string | null
          updated_at?: string | null
        }
        Update: {
          color_primario?: string | null
          created_at?: string | null
          fecha_registro?: string | null
          id?: string
          logo_url?: string | null
          nombre?: string
          plan?: string | null
          subdominio?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          firma_id: string | null
          id: string
          nombre: string | null
          rol: string
          telefono: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          firma_id?: string | null
          id: string
          nombre?: string | null
          rol?: string
          telefono?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          firma_id?: string | null
          id?: string
          nombre?: string | null
          rol?: string
          telefono?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_firma_id_fkey"
            columns: ["firma_id"]
            isOneToOne: false
            referencedRelation: "firmas"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
