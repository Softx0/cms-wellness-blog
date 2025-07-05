"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  XCircle,
  Trash2,
  MessageSquare,
  User as UserIcon,
  Calendar,
  FileText,
} from "lucide-react";
import {
  getPendingComments,
  updateCommentStatus,
  deleteComment,
} from "@/lib/api";
import { useAuth } from "@/lib/auth-client";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  status: string;
  author?: {
    id: string;
    name: string;
    email: string;
  } | null;
  post: {
    id: string;
    title: string;
    slug: string;
  };
}

interface CommentsResponse {
  comments: Comment[];
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchPendingComments();
  }, []);

  const fetchPendingComments = async () => {
    try {
      const data = (await getPendingComments()) as CommentsResponse;
      setComments(data.comments || []);
    } catch (error) {
      console.error("Error fetching pending comments:", error);
      setMessage({ type: "error", text: "Error al cargar los comentarios" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (
    commentId: string,
    status: "approved" | "rejected"
  ) => {
    setActionLoading(commentId);
    try {
      await updateCommentStatus(commentId, status);
      setComments(comments.filter((comment) => comment.id !== commentId));
      setMessage({
        type: "success",
        text: `Comentario ${
          status === "approved" ? "aprobado" : "rechazado"
        } exitosamente`,
      });
    } catch (error) {
      console.error("Error updating comment status:", error);
      setMessage({ type: "error", text: "Error al actualizar el comentario" });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este comentario?")) {
      return;
    }

    setActionLoading(commentId);
    try {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment.id !== commentId));
      setMessage({
        type: "success",
        text: "Comentario eliminado exitosamente",
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
      setMessage({ type: "error", text: "Error al eliminar el comentario" });
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p>Cargando comentarios...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <MessageSquare className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Moderación de Comentarios</h1>
        </div>

        {message && (
          <Alert
            className={`mb-6 ${
              message.type === "error"
                ? "border-destructive"
                : "border-green-500"
            }`}
          >
            <AlertDescription
              className={
                message.type === "error" ? "text-destructive" : "text-green-700"
              }
            >
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {comments.length} comentario{comments.length !== 1 ? "s" : ""}{" "}
            pendiente{comments.length !== 1 ? "s" : ""} de moderación
          </p>
          <Button
            variant="outline"
            onClick={fetchPendingComments}
            disabled={loading}
          >
            Actualizar
          </Button>
        </div>

        {comments.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h3 className="text-lg font-semibold mb-2">¡Todo al día!</h3>
              <p className="text-muted-foreground">
                No hay comentarios pendientes de moderación.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {comments.map((comment) => (
              <Card key={comment.id} className="border-l-4 border-l-yellow-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">
                          {comment.author?.name || "Anonymous"}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          ({comment.author?.email || "No email"})
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {formatDistanceToNow(new Date(comment.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span>{comment.post.title}</span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-yellow-100 text-yellow-800"
                    >
                      {comment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      Contenido del comentario:
                    </p>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="whitespace-pre-wrap">{comment.content}</p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      onClick={() => handleUpdateStatus(comment.id, "approved")}
                      disabled={actionLoading === comment.id}
                      className="bg-green-600 hover:bg-green-700 text-white"
                      size="sm"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Aprobar
                    </Button>
                    <Button
                      onClick={() => handleUpdateStatus(comment.id, "rejected")}
                      disabled={actionLoading === comment.id}
                      variant="destructive"
                      size="sm"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Rechazar
                    </Button>
                    <Button
                      onClick={() => handleDeleteComment(comment.id)}
                      disabled={actionLoading === comment.id}
                      variant="outline"
                      size="sm"
                      className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Eliminar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
