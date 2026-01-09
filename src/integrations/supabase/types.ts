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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          created_at: string
          description: string
          icon: string
          id: string
          name: string
          points: number
          requirement_value: number
          type: Database["public"]["Enums"]["achievement_type"]
        }
        Insert: {
          created_at?: string
          description: string
          icon?: string
          id?: string
          name: string
          points?: number
          requirement_value: number
          type: Database["public"]["Enums"]["achievement_type"]
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name?: string
          points?: number
          requirement_value?: number
          type?: Database["public"]["Enums"]["achievement_type"]
        }
        Relationships: []
      }
      anamnesis: {
        Row: {
          additional_notes: string | null
          available_days: string[] | null
          completed_at: string
          created_at: string
          eating_habits: string | null
          health_conditions: string | null
          id: string
          injury_history: string | null
          medications: string | null
          objectives: string[] | null
          physical_limitations: string | null
          sleep_hours: number | null
          sleep_quality: string | null
          student_id: string
          surgeries: string | null
          training_frequency: number | null
          updated_at: string
        }
        Insert: {
          additional_notes?: string | null
          available_days?: string[] | null
          completed_at?: string
          created_at?: string
          eating_habits?: string | null
          health_conditions?: string | null
          id?: string
          injury_history?: string | null
          medications?: string | null
          objectives?: string[] | null
          physical_limitations?: string | null
          sleep_hours?: number | null
          sleep_quality?: string | null
          student_id: string
          surgeries?: string | null
          training_frequency?: number | null
          updated_at?: string
        }
        Update: {
          additional_notes?: string | null
          available_days?: string[] | null
          completed_at?: string
          created_at?: string
          eating_habits?: string | null
          health_conditions?: string | null
          id?: string
          injury_history?: string | null
          medications?: string | null
          objectives?: string[] | null
          physical_limitations?: string | null
          sleep_hours?: number | null
          sleep_quality?: string | null
          student_id?: string
          surgeries?: string | null
          training_frequency?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "anamnesis_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      diet_templates: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          name: string
          total_calories: number | null
          trainer_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          name: string
          total_calories?: number | null
          trainer_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          name?: string
          total_calories?: number | null
          trainer_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      diets: {
        Row: {
          created_at: string
          day_of_week: number | null
          id: string
          is_active: boolean
          name: string
          notes: string | null
          student_id: string
          template_id: string | null
          trainer_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          day_of_week?: number | null
          id?: string
          is_active?: boolean
          name: string
          notes?: string | null
          student_id: string
          template_id?: string | null
          trainer_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          day_of_week?: number | null
          id?: string
          is_active?: boolean
          name?: string
          notes?: string | null
          student_id?: string
          template_id?: string | null
          trainer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "diets_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diets_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "diet_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      exercise_logs: {
        Row: {
          actual_reps: string | null
          actual_sets: number | null
          actual_weight: string | null
          completed: boolean
          completed_at: string | null
          exercise_id: string
          id: string
          notes: string | null
          workout_log_id: string
        }
        Insert: {
          actual_reps?: string | null
          actual_sets?: number | null
          actual_weight?: string | null
          completed?: boolean
          completed_at?: string | null
          exercise_id: string
          id?: string
          notes?: string | null
          workout_log_id: string
        }
        Update: {
          actual_reps?: string | null
          actual_sets?: number | null
          actual_weight?: string | null
          completed?: boolean
          completed_at?: string | null
          exercise_id?: string
          id?: string
          notes?: string | null
          workout_log_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercise_logs_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercise_logs_workout_log_id_fkey"
            columns: ["workout_log_id"]
            isOneToOne: false
            referencedRelation: "workout_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      exercises: {
        Row: {
          created_at: string
          id: string
          name: string
          notes: string | null
          order_index: number
          reps: string
          rest_seconds: number | null
          sets: number
          video_url: string | null
          weight: string | null
          workout_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          order_index?: number
          reps?: string
          rest_seconds?: number | null
          sets?: number
          video_url?: string | null
          weight?: string | null
          workout_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          order_index?: number
          reps?: string
          rest_seconds?: number | null
          sets?: number
          video_url?: string | null
          weight?: string | null
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercises_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_logs: {
        Row: {
          completed_at: string
          id: string
          meal_id: string
          notes: string | null
          student_id: string
        }
        Insert: {
          completed_at?: string
          id?: string
          meal_id: string
          notes?: string | null
          student_id: string
        }
        Update: {
          completed_at?: string
          id?: string
          meal_id?: string
          notes?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meal_logs_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_logs_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      meals: {
        Row: {
          calories: number | null
          carbs: number | null
          created_at: string
          diet_id: string
          fats: number | null
          foods: string
          id: string
          name: string
          notes: string | null
          order_index: number
          protein: number | null
          time_hint: string | null
        }
        Insert: {
          calories?: number | null
          carbs?: number | null
          created_at?: string
          diet_id: string
          fats?: number | null
          foods: string
          id?: string
          name: string
          notes?: string | null
          order_index?: number
          protein?: number | null
          time_hint?: string | null
        }
        Update: {
          calories?: number | null
          carbs?: number | null
          created_at?: string
          diet_id?: string
          fats?: number | null
          foods?: string
          id?: string
          name?: string
          notes?: string | null
          order_index?: number
          protein?: number | null
          time_hint?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meals_diet_id_fkey"
            columns: ["diet_id"]
            isOneToOne: false
            referencedRelation: "diets"
            referencedColumns: ["id"]
          },
        ]
      }
      measurements: {
        Row: {
          body_fat_percentage: number | null
          chest: number | null
          created_at: string
          hips: number | null
          id: string
          left_arm: number | null
          left_thigh: number | null
          measured_at: string
          notes: string | null
          right_arm: number | null
          right_thigh: number | null
          student_id: string
          waist: number | null
          weight: number | null
        }
        Insert: {
          body_fat_percentage?: number | null
          chest?: number | null
          created_at?: string
          hips?: number | null
          id?: string
          left_arm?: number | null
          left_thigh?: number | null
          measured_at?: string
          notes?: string | null
          right_arm?: number | null
          right_thigh?: number | null
          student_id: string
          waist?: number | null
          weight?: number | null
        }
        Update: {
          body_fat_percentage?: number | null
          chest?: number | null
          created_at?: string
          hips?: number | null
          id?: string
          left_arm?: number | null
          left_thigh?: number | null
          measured_at?: string
          notes?: string | null
          right_arm?: number | null
          right_thigh?: number | null
          student_id?: string
          waist?: number | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "measurements_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          link: string | null
          message: string
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          link?: string | null
          message: string
          read?: boolean
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          link?: string | null
          message?: string
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      progress_photos: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          photo_type: string
          photo_url: string
          student_id: string
          taken_at: string
          visible_to_trainer: boolean | null
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          photo_type?: string
          photo_url: string
          student_id: string
          taken_at?: string
          visible_to_trainer?: boolean | null
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          photo_type?: string
          photo_url?: string
          student_id?: string
          taken_at?: string
          visible_to_trainer?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "progress_photos_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_achievements: {
        Row: {
          achievement_id: string
          earned_at: string
          id: string
          student_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string
          id?: string
          student_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string
          id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_achievements_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          anamnesis_completed: boolean | null
          avatar_url: string | null
          best_streak: number
          created_at: string
          current_streak: number
          email: string
          full_name: string
          goal: Database["public"]["Enums"]["goal_type"]
          id: string
          notes: string | null
          phone: string | null
          start_date: string
          status: Database["public"]["Enums"]["student_status"]
          total_points: number
          trainer_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          anamnesis_completed?: boolean | null
          avatar_url?: string | null
          best_streak?: number
          created_at?: string
          current_streak?: number
          email: string
          full_name: string
          goal?: Database["public"]["Enums"]["goal_type"]
          id?: string
          notes?: string | null
          phone?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["student_status"]
          total_points?: number
          trainer_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          anamnesis_completed?: boolean | null
          avatar_url?: string | null
          best_streak?: number
          created_at?: string
          current_streak?: number
          email?: string
          full_name?: string
          goal?: Database["public"]["Enums"]["goal_type"]
          id?: string
          notes?: string | null
          phone?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["student_status"]
          total_points?: number
          trainer_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      template_exercises: {
        Row: {
          created_at: string
          id: string
          name: string
          notes: string | null
          order_index: number
          reps: string
          rest_seconds: number | null
          sets: number
          template_id: string
          video_url: string | null
          weight: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          order_index?: number
          reps?: string
          rest_seconds?: number | null
          sets?: number
          template_id: string
          video_url?: string | null
          weight?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          order_index?: number
          reps?: string
          rest_seconds?: number | null
          sets?: number
          template_id?: string
          video_url?: string | null
          weight?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "template_exercises_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "workout_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      template_meals: {
        Row: {
          calories: number | null
          carbs: number | null
          created_at: string
          fats: number | null
          foods: string
          id: string
          name: string
          notes: string | null
          order_index: number
          protein: number | null
          template_id: string
          time_hint: string | null
        }
        Insert: {
          calories?: number | null
          carbs?: number | null
          created_at?: string
          fats?: number | null
          foods: string
          id?: string
          name: string
          notes?: string | null
          order_index?: number
          protein?: number | null
          template_id: string
          time_hint?: string | null
        }
        Update: {
          calories?: number | null
          carbs?: number | null
          created_at?: string
          fats?: number | null
          foods?: string
          id?: string
          name?: string
          notes?: string | null
          order_index?: number
          protein?: number | null
          template_id?: string
          time_hint?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "template_meals_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "diet_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      workout_logs: {
        Row: {
          completed_at: string
          duration_minutes: number | null
          id: string
          notes: string | null
          rating: number | null
          student_id: string
          workout_id: string
        }
        Insert: {
          completed_at?: string
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          rating?: number | null
          student_id: string
          workout_id: string
        }
        Update: {
          completed_at?: string
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          rating?: number | null
          student_id?: string
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_logs_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_logs_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_templates: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          name: string
          trainer_id: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          name: string
          trainer_id: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          name?: string
          trainer_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      workouts: {
        Row: {
          created_at: string
          day_of_week: number | null
          id: string
          is_active: boolean
          name: string
          notes: string | null
          scheduled_date: string | null
          student_id: string
          template_id: string | null
          trainer_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          day_of_week?: number | null
          id?: string
          is_active?: boolean
          name: string
          notes?: string | null
          scheduled_date?: string | null
          student_id: string
          template_id?: string | null
          trainer_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          day_of_week?: number | null
          id?: string
          is_active?: boolean
          name?: string
          notes?: string | null
          scheduled_date?: string | null
          student_id?: string
          template_id?: string | null
          trainer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workouts_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workouts_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "workout_templates"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_student_record: { Args: never; Returns: string }
      get_student_id_for_user: { Args: { _user_id: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_student: { Args: { _user_id: string }; Returns: boolean }
      is_trainer: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      achievement_type: "streak" | "milestone" | "consistency" | "progress"
      app_role: "trainer" | "student"
      goal_type:
        | "weight_loss"
        | "muscle_gain"
        | "maintenance"
        | "conditioning"
        | "flexibility"
        | "other"
      student_status: "active" | "paused" | "inactive"
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
      achievement_type: ["streak", "milestone", "consistency", "progress"],
      app_role: ["trainer", "student"],
      goal_type: [
        "weight_loss",
        "muscle_gain",
        "maintenance",
        "conditioning",
        "flexibility",
        "other",
      ],
      student_status: ["active", "paused", "inactive"],
    },
  },
} as const
